<?php

namespace App\Features\Campaigns\Services;

use App\Features\Campaigns\Domains\Data\CampaignTrackingEventData;
use App\Features\Campaigns\Domains\Enums\TrackingOptionEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\Campaigns\Domains\Models\CampaignTrackingEvent;
use App\Features\EmailLists\Domains\Models\Contact;
use Illuminate\Support\Carbon;

class CampaignTrackingEventService
{
    public function __construct(
        private CampaignTrackingEvent $campaignTrackingEvent
    ) { }

    /**
     * Tracking no of emails opened on a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackOpens(Campaign $campaign, Contact $contact): void
    {
        $existingCampaignTrackingEvent = $this->campaignTrackingEvent->findCampaignTrackingEvent($campaign->id, TrackingOptionEnum::OPEN, $contact->id);

        if(!is_null($existingCampaignTrackingEvent)) return;

        $campaignTrackingEventData = CampaignTrackingEventData::validateAndCreate([
            'campaign_id' => $campaign->id,
            'type' => TrackingOptionEnum::OPEN,
            'action_performed_at' => Carbon::now('Asia/Kolkata'),
            'contact_id' => $contact->id
        ]);
        $campaignTrackingEvent = $this->campaignTrackingEvent->createCampaignTrackingEvent($campaignTrackingEventData);
    }

    /**
     * Tracking no of links clicked inside the email of a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackClicks(Campaign $campaign, Contact $contact): void
    {
        $existingCampaignTrackingEvent = $this->campaignTrackingEvent->findCampaignTrackingEvent($campaign->id, TrackingOptionEnum::CLICK, $contact->id);

        if(!is_null($existingCampaignTrackingEvent)) return;

        $campaignTrackingEventData = CampaignTrackingEventData::validateAndCreate([
            'campaign_id' => $campaign->id,
            'type' => TrackingOptionEnum::CLICK,
            'action_performed_at' => Carbon::now('Asia/Kolkata'),
            'contact_id' => $contact->id
        ]);
        $campaignTrackingEvent = $this->campaignTrackingEvent->createCampaignTrackingEvent($campaignTrackingEventData);
    }

    /**
     * Tracking bounces of a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackBounces(Campaign $campaign, Contact $contact): void
    {
        $existingCampaignTrackingEvent = $this->campaignTrackingEvent->findCampaignTrackingEvent($campaign->id, TrackingOptionEnum::BOUNCE, $contact->id);

        if(!is_null($existingCampaignTrackingEvent)) return;

        $campaignTrackingEventData = CampaignTrackingEventData::validateAndCreate([
            'campaign_id' => $campaign->id,
            'type' => TrackingOptionEnum::BOUNCE,
            'action_performed_at' => Carbon::now('Asia/Kolkata'),
            'contact_id' => $contact->id
        ]);
        $campaignTrackingEvent = $this->campaignTrackingEvent->createCampaignTrackingEvent($campaignTrackingEventData);
    }

    /**
     * Tracking no of unsubscribes in a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackUnsubcribes(Campaign $campaign, Contact $contact): void
    {
        $existingCampaignTrackingEvent = $this->campaignTrackingEvent->findCampaignTrackingEvent($campaign->id, TrackingOptionEnum::UNSUBSCRIBE, $contact->id);

        if(!is_null($existingCampaignTrackingEvent)) return;

        $campaignTrackingEventData = CampaignTrackingEventData::validateAndCreate([
            'campaign_id' => $campaign->id,
            'type' => TrackingOptionEnum::UNSUBSCRIBE,
            'action_performed_at' => Carbon::now('Asia/Kolkata'),
            'contact_id' => $contact->id
        ]);
        $campaignTrackingEvent = $this->campaignTrackingEvent->createCampaignTrackingEvent($campaignTrackingEventData);
    }

    /**
     * Tracking spam complaints for a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackSpams(Campaign $campaign, Contact $contact): void
    {
        $existingCampaignTrackingEvent = $this->campaignTrackingEvent->findCampaignTrackingEvent($campaign->id, TrackingOptionEnum::SPAM, $contact->id);

        if(!is_null($existingCampaignTrackingEvent)) return;

        $campaignTrackingEventData = CampaignTrackingEventData::validateAndCreate([
            'campaign_id' => $campaign->id,
            'type' => TrackingOptionEnum::SPAM,
            'action_performed_at' => Carbon::now('Asia/Kolkata'),
            'contact_id' => $contact->id
        ]);
        $campaignTrackingEvent = $this->campaignTrackingEvent->createCampaignTrackingEvent($campaignTrackingEventData);
    }
}

?>