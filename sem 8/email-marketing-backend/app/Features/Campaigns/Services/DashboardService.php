<?php

namespace App\Features\Campaigns\Services;

use App\Features\Campaigns\Domains\Enums\TrackingOptionEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\Campaigns\Domains\Models\CampaignLog;
use App\Features\Campaigns\Domains\Models\CampaignTrackingEvent;
use App\Features\EmailLists\Domains\Models\Contact;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class DashboardService
{
    private CampaignTrackingEvent $campaignTrackingEvent;
    private Campaign $campaign;
    private string $organizationId;
    private Contact $contact;
    private CampaignLog $campaignLog;

    public function __construct() 
    {
        $this->campaignTrackingEvent = new CampaignTrackingEvent();
        $this->campaign = new Campaign();
        $this->organizationId = auth('api')->user()->organization_id;
        $this->contact = new Contact();
        $this->campaignLog = new CampaignLog();
    }

    /**
     * Fetches all the monthwise email opened
     *
     * @return Collection
     */
    public function fetchMonthWiseOpensCount(): Collection
    {
        $campaignIds = $this->campaign->getAllCampaignsByOrganizationId($this->organizationId)->pluck('id')->toArray();
        $opensPerMonth = $this->campaignTrackingEvent->fetchMonthWiseOpensCount($campaignIds);
        return $opensPerMonth;
    }

    /**
     * Fetches monthly subscribers vs unsubscribers
     *
     * @return Collection
     */
    public function fetchSubscribersGraph(): Collection
    {
        $campaignIds = $this->campaign->getAllCampaignsByOrganizationId($this->organizationId)->pluck('id')->toArray();
        $data = $this->campaignTrackingEvent->fetchSubscribersGraph($this->organizationId, $campaignIds);
        return $data;
    }

    public function fetchMoreInformationOnSubscribers()
    {
        $campaignIds = $this->campaign->getAllCampaignsByOrganizationId($this->organizationId)->pluck('id')->toArray();

        $noOfSubscribers = $this->contact->getAllContacts($this->organizationId)->count();
        $noOfUnsubscribes = $this->campaignTrackingEvent->fetchAllTrackingEvents($campaignIds, TrackingOptionEnum::UNSUBSCRIBE)->count();

        $noOfActiveSubscribers = $noOfSubscribers - $noOfUnsubscribes;

        $noOfSubscribersAddedToday = $this->contact->getAllContactsCreatedBetween(
            Carbon::now('Asia/Kolkata')->startOfDay(),
            Carbon::now('Asia/Kolkata'),
            $this->organizationId
        )->count();

        $noOfSubscribersAddedThisMonth = $this->contact->getAllContactsCreatedBetween(
            Carbon::now('Asia/Kolkata')->startOfMonth(),
            Carbon::now('Asia/Kolkata'),
            $this->organizationId
        )->count();

        $noOfSubscribersAddedInLast30Days = $this->contact->getAllContactsCreatedBetween(
            Carbon::now('Asia/Kolkata')->subDay(30),
            Carbon::now('Asia/Kolkata'),
            $this->organizationId
        )->count();

        $noOfUnsubscribersInLast30Days = $this->campaignTrackingEvent->fetchAllTrackingEventsBetween(
            $campaignIds,
            TrackingOptionEnum::UNSUBSCRIBE,
            Carbon::now('Asia/Kolkata')->subDay(30),
            Carbon::now('Asia/Kolkata')
        )->count();

        return [
            'total_active_subscribers' => $noOfActiveSubscribers,
            'new_subscribers_today' => $noOfSubscribersAddedToday,
            'new_subscribers_this_month' => $noOfSubscribersAddedThisMonth,
            'new_subscribers_in_last_30_days' => $noOfSubscribersAddedInLast30Days,
            'unsubscribes_in_last_30_days' => $noOfUnsubscribersInLast30Days
        ];
    }

    /**
     * Fetch campaign tracking data
     *
     * @return array
     */
    public function fetchCampaignsInfo(): array
    {
        $campaignIds = $this->campaign->getAllCampaignsByOrganizationId($this->organizationId)->pluck('id')->toArray();

        $noOfEmailsSent = $this->campaignLog->getAllSuccessfullLogs($campaignIds)->count();

        $noOfOpens = $this->campaignTrackingEvent->fetchAllTrackingEvents($campaignIds, TrackingOptionEnum::OPEN)->count();

        $noOfClicks = $this->campaignTrackingEvent->fetchAllTrackingEvents($campaignIds, TrackingOptionEnum::CLICK)->count();

        $ctor = 0;

        if($noOfOpens != 0) {
            $ctor = ($noOfClicks / $noOfOpens) * 100;
        }

        $previousMonthOpensVsClicks = $this->campaignTrackingEvent->previousMonthOpensVsClicks($campaignIds);

        return [
            'emails_sent' => $noOfEmailsSent,
            'opens' => $noOfOpens,
            'clicks' => $noOfClicks,
            'ctor' => $ctor,
            'opens_vs_clicks' => $previousMonthOpensVsClicks
        ];
    }
}

?>
