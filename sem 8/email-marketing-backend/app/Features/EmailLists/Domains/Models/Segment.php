<?php

namespace App\Features\EmailLists\Domains\Models;

use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\EmailLists\Domains\Data\AddRulesData;
use App\Features\EmailLists\Domains\Data\GetContactsForSegmentData;
use App\Features\EmailLists\Domains\Data\SaveContactData;
use App\Features\EmailLists\Domains\Data\SegmentData;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Segment extends BaseModel
{

    public function rules():HasMany
    {
        return $this->hasMany(SegmentRule::class);
    }

    public function contacts(): BelongsToMany
    {
        return $this->belongsToMany(Contact::class);
    }

    public function campaigns(): BelongsToMany
    {
        return $this->belongsToMany(
            Campaign::class,
            'campaign_segment',
            'segment_id',
            'campaign_id'
        );
    }

    public function getAllSegments(int $perPage, string $organizationId):LengthAwarePaginator
    {
        return $this->where('organization_id', $organizationId)->orderby('created_at', 'desc')->paginate($perPage);
    }

   /**
    * Persists segment into the DB
    *
    * @param SegmentData $data
    * @return self
    */
    public function persistSegment(SegmentData $data):self
    {
        $segment = $this::create([
            "id" => Str::uuid(),
            "name" => $data->name,
            "email_list_id" => null,
            "organization_id" => auth('api')->user()->organization_id,
        ]);
        return $segment;
    }

    /**
     * Add rules for a segment with segmentId
     *
     * @param AddRulesData $data
     * @param string $segmentId
     * @return self
     */
    public function addRules(AddRulesData $data,string $segmentId):self
    {

        $segment = $this::findOrFail($segmentId);

        SegmentRule::where('segment_id', $segment->id)->delete();

        foreach ($data->rules as $rule) {
            $segment->rules()->create([
                'id' => Str::uuid(),
                'field' => $rule['field'],
                'operator' => $rule['operator'],
                'value' => $rule['value'],
                'condition_type' => $rule['condition_type']

            ]);
        }
        return $segment->load('rules');
    }

    /**
     * Retrives contacts which satisfies all the rules for a segment
     *
     * @param GetContactsForSegmentData $data
     * @return Collection|JsonResponse
     */
    public function getContactsForSegment(GetContactsForSegmentData $data): Collection
    {
        $query = Contact::query();
        $segment = $this::with('rules')->findOrFail($data->segmentId);
        $rules = $segment->rules;

        if ($rules->isEmpty()) {
            return $query->get();
        }

        $andRules = $rules->where('condition_type', 'AND');
        if ($andRules->isNotEmpty()) {
            foreach ($andRules as $rule) {
                if (empty($rule->field) || empty($rule->operator) || $rule->value === null) {
                    continue;
                }

                $query->where(
                    $rule->field,
                    $this->mapOperator($rule->operator),
                    $this->formatValue($rule)
                );
            }
        }

        $orRules = $rules->where('condition_type', 'OR');
        if ($orRules->isNotEmpty()) {
            $query->orWhere(function ($orQuery) use ($orRules) {
                foreach ($orRules as $rule) {
                    if (empty($rule->field) || empty($rule->operator) || $rule->value === null) {
                        continue;
                    }

                    $orQuery->orWhere(
                        $rule->field,
                        $this->mapOperator($rule->operator),
                        $this->formatValue($rule)
                    );
                }
            });
        }
        return $query->get();
    }

    /**
     * saves contact in the bridging table for segment
     *
     * @param SaveContactData $data
     * @return Collection
     */
    public function saveContacts(SaveContactData $data)
    {
        $segment = Segment::findOrFail($data->segmentId);

        $segment->contacts()->syncWithoutDetaching($data->contactIds);

        return $segment->contacts;
    }

    public function existingContacts(string $segmentId){
        $segment = Segment::with('contacts')->findOrFail($segmentId);
        return $segment;
    }

    private function mapOperator(string $operator): string
    {
        return match ($operator) {
            'EQUALS' => '=',
            'NOT EQUALS' => '!=',
            'CONTAINS' => 'LIKE',
            'NOT CONTAINS' => 'NOT LIKE',
            'LIKE' => 'LIKE',
            default => '='
        };
    }

    private function formatValue($rule): string
    {
        return match ($rule->operator) {
            'CONTAINS', 'NOT CONTAINS' => '%' . $rule->value . '%',
            default => $rule->value
        };
    }

    public function getContactsForMultipleSegment(array $segment_ids)
    {
        $contacts_ids = DB::table('contact_segment')
                        ->whereIn('segment_id', $segment_ids)
                        ->distinct()
                        ->pluck('contact_id');

        $contacts = DB::table('contacts')->whereIn('id', $contacts_ids)->get();
        return $contacts;
    }
}
