<?php

namespace App\Features\EmailLists\Services;

use App\Features\EmailLists\Domains\Data\AddRulesData;
use App\Features\EmailLists\Domains\Data\GetContactsForSegmentData;
use App\Features\EmailLists\Domains\Data\SegmentData;
use App\Features\EmailLists\Domains\Models\Contact;
use App\Features\EmailLists\Domains\Models\Segment;
use App\Features\EmailLists\Domains\Models\SegmentRule;
use App\Features\EmailLists\Domains\Data\SaveContactData;
use Illuminate\Support\Str;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class SegmentService
{
    public function __construct(
        public Segment $segment,
        public SegmentRule $segmentRule
    ) { }

    public function getAllSegements(int $perPage, string $organizationId):LengthAwarePaginator
    {
        return $this->segment->getAllSegments($perPage, $organizationId);
    }

    public function createSegment(SegmentData $data)
    {
        return $this->segment->persistSegment($data);
    }

    public function addRules(AddRulesData $data, string $segmentId): Segment
    {
        return $this->segment->addRules($data,$segmentId);
    }

    public function getContactsForSegment(GetContactsForSegmentData $data)
    {
        return $this->segment->getContactsForSegment($data);
    }

    public function saveContacts(SaveContactData $data)
    {
        return $this->segment->saveContacts($data);
    }

    public function existingContacts(string $segmentId){
        return $this->segment->existingContacts($segmentId);
    }
    public function getContactsForMultipleSegments(array $segment_ids): Collection
    {
        $segment = new Segment();
        $contacts = $segment->getContactsForMultipleSegment($segment_ids);
        return $contacts;
    }

    public function getRulesForSegment(Segment $segment): Collection
    {
        $segmentRules = $this->segmentRule->getSegmentRulesBySegmentId($segment->id);
        return $segmentRules;
    }
}
