<?php

namespace App\Features\Campaigns\Domains\Models;

use App\Features\Campaigns\Domains\Data\CampaignLogData;
use App\Features\Campaigns\Domains\Enums\CampaignLogStatusEnum;
use App\Features\EmailLists\Domains\Models\Contact;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class CampaignLog extends BaseModel
{
    /**
     * Campaign Log belongs to a campaign
     *
     * @return BelongsTo
     */
    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    /**
     * Campaign Log belongs to a contact
     *
     * @return BelongsTo
     */
    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * Creating a new campaign log
     *
     * @param CampaignLogData $campaignLogData
     * @return self
     */
    public function createCampaignLog(CampaignLogData $campaignLogData): self
    {
        $campaignLog = $this->create($campaignLogData->toArray());
        return $campaignLog;
    }

    /**
     * Change campaign log status
     *
     * @param CampaignLogStatusEnum $status
     * @return boolean
     */
    public function updateStatus(CampaignLogStatusEnum $status): bool
    {
        $isUpdated = $this->update(['status' => $status]);
        return $isUpdated;
    }

    /**
     * Mark log as failure
     *
     * @param string $failureReason
     * @return boolean
     */
    public function updateFailureReason(string $failureReason): bool
    {
        $isUpdated = $this->update(['status' => CampaignLogStatusEnum::FAILED, 'failure_reason' => $failureReason]);
        return $isUpdated;
    }

    /**
     * Fetching all successfull logs
     *
     * @param array $campaignIds
     * @return Collection
     */
    public function getAllSuccessfullLogs(array $campaignIds): Collection
    {
        $successfullLogs = $this->whereIn('campaign_id', $campaignIds)
                                ->where('status', CampaignLogStatusEnum::SENT)
                                ->get();

        return $successfullLogs;
    }
}
