<?php

namespace App\Features\Campaigns\Services;

use App\Features\Campaigns\Domains\Data\CampaignEmailTemplateData;
use App\Features\Campaigns\Domains\Data\CreateCampaignData;
use App\Features\Campaigns\Domains\Data\ScheduleCampaignData;
use App\Features\Campaigns\Domains\Data\UpdateCampaignData;
use App\Features\Campaigns\Domains\Enums\CampaignStatusEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\EmailLists\Services\SegmentService;
use App\Features\Users\Services\OrganizationService;
use Illuminate\Database\Eloquent\Collection;

class CampaignService
{
    /**
     * CampaignService Constructor
     *
     * @param Campaign $campaign
     */
    public function __construct(
        private SegmentService $segmentService,
        private OrganizationService $organizationService
    ) { }

    /**
     * Creating a new Campaign
     *
     * @param CreateCampaignData $createCampaignData
     * @return Campaign
     */
    public function createCampaign(CreateCampaignData $createCampaignData): Campaign
    {
        $user_id = auth('api')->user()->id;
        $createCampaignData->setUserId($user_id);
        $organization_id = auth('api')->user()->organization_id;
        $createCampaignData->setOrganizationId($organization_id);
        if(is_null($createCampaignData->reply_to_email)) {
            $organization = $this->organizationService->findOrganizationById($organization_id);
            $createCampaignData->setReplyToEmail($organization->email);
        }
        $numOfRecipients = $this->segmentService->getContactsForMultipleSegments($createCampaignData->segment_ids)->count();
        $createCampaignData->setTotalRecipients($numOfRecipients);
        $campaign = new Campaign();
        return $campaign->createCampaign($createCampaignData);
    }

    /**
     * Setting Email template
     *
     * @param CampaignEmailTemplateData $campaignEmailTemplateData
     * @param Campaign $campaign
     * @return boolean
     */
    public function setCampaignEmailTemplate(CampaignEmailTemplateData $campaignEmailTemplateData, Campaign $campaign): bool
    {
        return $campaign->updateCampaign($campaignEmailTemplateData);
    }

    /**
     * Setting schedule time for campaigns
     *
     * @param ScheduleCampaignData $scheduleCampaignData
     * @param Campaign $campaign
     * @return boolean
     */
    public function scheduleCampaign(ScheduleCampaignData $scheduleCampaignData, Campaign $campaign): bool
    {
        return $campaign->updateCampaign($scheduleCampaignData);
    }

    /**
     * Updating an existing campaign
     *
     * @param UpdateCampaignData $updateCampaignData
     * @param Campaign $campaign
     * @return boolean
     */
    public function updateCampaign(UpdateCampaignData $updateCampaignData, Campaign $campaign): bool
    {
        $numOfRecipients = $this->segmentService->getContactsForMultipleSegments($updateCampaignData->segment_ids)->count();
        $updateCampaignData->setTotalRecipients($numOfRecipients);
        return $campaign->updateCampaign($updateCampaignData);
    }

    /**
     * Fetching all campaigns
     *
     * @return Collection
     */
    public function getAllCampaigns(): Collection
    {
        $campaign = new Campaign();
        $organization_id = auth('api')->user()->organization_id;
        return $campaign->getAllCampaignsByOrganizationId($organization_id);
    }

    /**
     * Fetching all draft campaigns
     *
     * @return Collection
     */
    public function getDraftCampaigns(): Collection
    {
        $campaign = new Campaign();
        $organization_id = auth('api')->user()->organization_id;
        return $campaign->getCampaignByStatus($organization_id, CampaignStatusEnum::DRAFT);
    }

    /**
     * Fetching all scheduled campaigns
     *
     * @return Collection
     */
    public function getScheduledCampaigns(): Collection
    {
        $campaign = new Campaign();
        $organization_id = auth('api')->user()->organization_id;
        return $campaign->getCampaignByStatus($organization_id, CampaignStatusEnum::SCHEDULED);
    }

    /**
     * Fetching all completed campaigns
     *
     * @return Collection
     */
    public function getCompletedCampaigns(): Collection
    {
        $campaign = new Campaign();
        $organization_id = auth('api')->user()->organization_id;
        return $campaign->getCampaignByStatus($organization_id, CampaignStatusEnum::COMPLETED);
    }

    /**
     * Deleting exisiting campaign
     *
     * @param Campaign $campaign
     * @return boolean
     */
    public function deleteCampaign(Campaign $campaign): bool
    {
        return $campaign->deleteCampaign();
    }
}

?>