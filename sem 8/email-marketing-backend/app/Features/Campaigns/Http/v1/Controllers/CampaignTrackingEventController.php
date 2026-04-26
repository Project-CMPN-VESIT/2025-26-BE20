<?php

namespace App\Features\Campaigns\Http\v1\Controllers;

use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\Campaigns\Services\CampaignTrackingEventService;
use App\Features\EmailLists\Domains\Models\Contact;
use Illuminate\Http\Request;

class CampaignTrackingEventController
{
    /**
     * Initializing Campaign Tracking Event Service
     *
     * @param CampaignTrackingEventService $campaignTrackingEventService
     */
    public function __construct(
        private CampaignTrackingEventService $campaignTrackingEventService
    ) { }

    /**
     * Tracking no of emails opened on a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackOpens(Campaign $campaign, Contact $contact)
    {
        $this->campaignTrackingEventService->trackOpens($campaign, $contact);

        $image = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAKPaHdkAAAAASUVORK5CYII=');

        return response($image)
                ->header('Access-Control-Allow-Origin', '*');
    }

    /**
     * Tracking no of links clicked inside the email of a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackClicks(Request $request, Campaign $campaign, Contact $contact)
    {
        $targetUrl = urldecode($request->url);
        $this->campaignTrackingEventService->trackClicks($campaign, $contact);
        return redirect()->away($targetUrl);
    }

    /**
     * Tracking bounces of a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackBounces(Campaign $campaign, Contact $contact)
    {
        $this->campaignTrackingEventService->trackBounces($campaign, $contact);
    }

    /**
     * Tracking no of unsubscribes in a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackUnsubscribes(Campaign $campaign, Contact $contact)
    {
        $this->campaignTrackingEventService->trackUnsubcribes($campaign, $contact);
        return response()->noContent();
    }

    /**
     * Tracking spam complaints for a campaign
     *
     * @param Campaign $campaign
     * @param Contact $contact
     * @return void
     */
    public function trackSpams(Campaign $campaign, Contact $contact)
    {
        $this->campaignTrackingEventService->trackSpams($campaign, $contact);
        return response()->noContent();
    }
}

?>