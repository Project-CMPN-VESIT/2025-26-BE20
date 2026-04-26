<?php

namespace App\Features\Campaigns\Domains\Models;

use App\Features\Campaigns\Domains\Data\CampaignEmailTemplateData;
use App\Features\Campaigns\Domains\Data\CreateCampaignData;
use App\Features\Campaigns\Domains\Data\ScheduleCampaignData;
use App\Features\Campaigns\Domains\Data\UpdateCampaignData;
use App\Features\Campaigns\Domains\Enums\CampaignStatusEnum;
use App\Features\EmailLists\Domains\Models\Segment;
use App\Features\EmailTemplates\Domains\Models\EmailTemplate;
use App\Features\EmailTemplates\Domains\Models\PredefinedTemplate;
use App\Features\Users\Domains\Models\Organization;
use App\Features\Users\Domains\Models\User;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;

class Campaign extends BaseModel
{
    protected $casts = [
        'status' => CampaignStatusEnum::class,
        'send_at' => 'datetime',
        'sent_at' => 'datetime'
    ];

    /**
     * Campaign belong to an Organization
     *
     * @return BelongsTo
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Campaign belongs to User
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Campaign has many segments
     *
     * @return BelongsToMany
     */
    public function segments(): BelongsToMany
    {
        return $this->belongsToMany(
            Segment::class,
            'campaign_segment',
            'campaign_id',
            'segment_id'
        );
    }

    /**
     * Accessor method to get template
     *
     * @return mixed
     */
    public function getEmailTemplateAttribute(): mixed
    {
        $template = PredefinedTemplate::find($this->email_template_id);

        if(!$template) {
            $template = EmailTemplate::find($this->email_template_id);
        }

        return $template;
    }

    /**
     * Function to create Campaign
     *
     * @param CreateCampaignData $createCampaignData
     * @return self
     */
    public function createCampaign(CreateCampaignData $createCampaignData): self
    {
        return DB::transaction(function () use ($createCampaignData) {
            $segment_ids = $createCampaignData->segment_ids;
            unset($createCampaignData->segment_ids);
            $campaign = $this->create($createCampaignData->toArray());
            $campaign->segments()->attach($segment_ids);

            return $campaign->refresh();
        });
    }

    /**
     * Updating campaign details
     *
     * @param CampaignEmailTemplateData|ScheduleCampaignData|UpdateCampaignData $data
     * @return boolean
     */
    public function updateCampaign(CampaignEmailTemplateData|ScheduleCampaignData|UpdateCampaignData $data): bool
    {
        $segment_ids = [];
        if(isset($data->segment_ids)) {
            $segment_ids = $data->segment_ids;
            unset($data->segment_ids);
            $this->segments()->sync($segment_ids);
        }
        return $this->update($data->toArray());
    }

    /**
     * Function to delete campaign
     *
     * @return boolean
     */
    public function deleteCampaign(): bool
    {
        $this->segments()->detach();
        return $this->delete();
    }

    /**
     * Fetching all draft campaigns
     *
     * @param string $organization_id
     * @return Collection
     */
    public function getCampaignByStatus(string $organization_id, CampaignStatusEnum $status): Collection
    {
        return $this->where('organization_id', '=', $organization_id)
                    ->where('status', '=', $status)
                    ->orderby('created_at', 'desc')
                    ->get();
    }

    /**
     * Fetching all campaign by an Organization
     *
     * @param string $organization_id
     * @return Collection
     */
    public function getAllCampaignsByOrganizationId(string $organization_id): Collection
    {
        return $this->where('organization_id', '=', $organization_id)->orderby('created_at', 'desc')->get();
    }

    /**
     * Fetching one specific campaign details
     *
     * @param string $id
     * @return self|null
     */
    public function getCampaignById(string $id): ?self
    {
        return $this->with('user')->with('organization')->where('id', '=', $id)->first() ?? null;
    }

    /**
     * Updating campaign status
     *
     * @param CampaignStatusEnum $status
     * @return boolean
     */
    public function updateStatus(CampaignStatusEnum $status): bool
    {
        return $this->update(['status' => $status]);
    }
}
