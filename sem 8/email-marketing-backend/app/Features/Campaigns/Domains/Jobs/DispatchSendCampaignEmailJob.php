<?php

namespace App\Features\Campaigns\Domains\Jobs;

use App\Features\Campaigns\Domains\Enums\CampaignStatusEnum;
use App\Features\Campaigns\Domains\Enums\TrackingOptionEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\Campaigns\Domains\Models\CampaignTrackingEvent;
use App\Features\EmailLists\Domains\Models\Contact;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class DispatchSendCampaignEmailJob implements ShouldQueue
{
    use Queueable;

    protected $campaign;

    /**
     * Create a new job instance.
     */
    public function __construct(Campaign $campaign)
    {
        $this->campaign = $campaign;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->campaign->updateStatus(CampaignStatusEnum::ONGOING);
        $template = $this->campaign->email_template;
        $segmentIds = $this->campaign->segments()->pluck('id');

        Contact::query()
            ->whereHas('segments', function ($q) use ($segmentIds) {
                $q->whereIn('segments.id', $segmentIds);
            })
            ->whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('campaign_tracking_events as cte')
                    ->join('campaigns as c', 'c.id', '=', 'cte.campaign_id')
                    ->whereColumn('cte.contact_id', 'contacts.id')
                    ->where('cte.type', TrackingOptionEnum::UNSUBSCRIBE)
                    ->whereColumn('c.organization_id', 'contacts.organization_id');
            })
            ->orderBy('contacts.id') // REQUIRED for chunk
            ->chunk(100, function ($contacts) use ($template) {
                foreach ($contacts as $contact) {
                    SendCampaignEmailJob::dispatch(
                        $contact,
                        $template,
                        $this->campaign
                    );
                }
            });

        $this->campaign->updateStatus(CampaignStatusEnum::COMPLETED);
    }
}
