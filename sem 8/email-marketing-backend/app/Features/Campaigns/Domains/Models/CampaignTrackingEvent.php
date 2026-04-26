<?php

namespace App\Features\Campaigns\Domains\Models;

use App\Features\Campaigns\Domains\Data\CampaignTrackingEventData;
use App\Features\Campaigns\Domains\Enums\TrackingOptionEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\EmailLists\Domains\Models\Contact;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CampaignTrackingEvent extends BaseModel
{
    protected $casts = [
        'action_performed_at' => 'datetime'
    ];

    /**
     * Campaign Log belongs to a single campaign
     *
     * @return BelongsTo
     */
    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    /**
     * Campaign Log belongs to a single contact
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
     * @param CampaignTrackingEventData $campaignTrackingEventData
     * @return self
     */
    public function createCampaignTrackingEvent(CampaignTrackingEventData $campaignTrackingEventData): self
    {
        $campaignTrackingEvent = $this->create($campaignTrackingEventData->toArray());
        return $campaignTrackingEvent;
    }

    /**
     * Fetching a single log from table belonging to a campaign of a specific tracking type
     * Will be basically used to not to duplicate a entry for same email
     *
     * @param string $campaign_id
     * @param TrackingOptionEnum $type
     * @param string $contact_id
     * @return self|null
     */
    public function findCampaignTrackingEvent(string $campaign_id, TrackingOptionEnum $type, string $contact_id): ?self
    {
        $campaignTrackingEvent = $this->where('campaign_id', '=', $campaign_id)
                            ->where('type', '=', $type)
                            ->where('contact_id', '=', $contact_id)
                            ->first();
        return $campaignTrackingEvent;
    }

    /**
     * Fetching all tracking events of a same type
     *
     * @param array $campaignIds
     * @param TrackingOptionEnum $type
     * @return Collection
     */
    public function fetchAllTrackingEvents(array $campaignIds, TrackingOptionEnum $type): Collection
    {
        $trackingEvents = $this->whereIn('campaign_id', $campaignIds)
                                ->where('type', $type)
                                ->get();
        
        return $trackingEvents;
    }

    /**
     * Fetching all tracking events between time interval
     *
     * @param array $campaignIds
     * @param TrackingOptionEnum $type
     * @param Carbon $startTime
     * @param Carbon $endTime
     * @return Collection
     */
    public function fetchAllTrackingEventsBetween(array $campaignIds, TrackingOptionEnum $type, Carbon $startTime, Carbon $endTime): Collection
    {
        $trackingEvents = $this->whereIn('campaign_id', $campaignIds)
                                ->where('type', $type)
                                ->whereBetween('action_performed_at', [$startTime, $endTime])
                                ->get();
        
        return $trackingEvents;
    }

    /**
     * Fetches all the monthwise email opened
     *
     * @param array $campaignIds
     * @return Collection
     */
    public function fetchMonthWiseOpensCount(array $campaignIds): Collection
    {
        $opensPerMonth = DB::query()
                        ->from(DB::raw("
                            (
                                WITH RECURSIVE months AS (
                                    SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 11 MONTH), '%Y-%m-01') AS month_start
                                    UNION ALL
                                    SELECT DATE_ADD(month_start, INTERVAL 1 MONTH)
                                    FROM months
                                    WHERE month_start < DATE_FORMAT(CURDATE(), '%Y-%m-01')
                                )
                                SELECT month_start FROM months
                            ) as m
                        "))
                        ->leftJoin('campaign_tracking_events as e', function ($join) use ($campaignIds) {
                            $join->on(
                                DB::raw("DATE_FORMAT(e.action_performed_at, '%Y-%m-01')"),
                                '=',
                                'm.month_start'
                            )
                            ->whereIn('e.campaign_id', $campaignIds)
                            ->where('e.type', 0); // opens
                        })
                        ->selectRaw("
                            DATE_FORMAT(m.month_start, '%m') as month,
                            COUNT(e.id) as opens_count
                        ")
                        ->groupBy('m.month_start')
                        ->orderBy('m.month_start')
                        ->get();

        return $opensPerMonth;
    }

    /**
     * Fetching monthwise subscribers vs unsubscribers
     *
     * @param string $organizationId
     * @param array $campaignIds
     * @return Collection
     */
    public function fetchSubscribersGraph(string $organizationId, array $campaignIds): Collection
    {
        $data = DB::query()
                    ->from(DB::raw("
                        (
                            WITH RECURSIVE months AS (
                                SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS month_start
                                UNION ALL
                                SELECT DATE_ADD(month_start, INTERVAL 1 MONTH)
                                FROM months
                                WHERE month_start < DATE_FORMAT(CURDATE(), '%Y-%m-01')
                            )
                            SELECT month_start FROM months
                        ) as m
                    "))
                    ->leftJoin('contacts as c', function ($join) use ($organizationId) {
                        $join->on(
                            DB::raw("DATE_FORMAT(c.created_at, '%Y-%m-01')"),
                            '=',
                            'm.month_start'
                        )
                        ->where('c.organization_id', $organizationId);
                    })
                    ->leftJoin('campaign_tracking_events as e', function ($join) use ($campaignIds) {
                        $join->on(
                            DB::raw("DATE_FORMAT(e.action_performed_at, '%Y-%m-01')"),
                            '=',
                            'm.month_start'
                        )
                        ->whereIn('e.campaign_id', $campaignIds)
                        ->where('e.type', 3); // unsubscribed
                    })
                    ->selectRaw("
                        DATE_FORMAT(m.month_start, '%b') as month,
                        COUNT(DISTINCT c.id) as subscribers,
                        COUNT(DISTINCT e.id) as unsubscribers
                    ")
                    ->groupBy('m.month_start')
                    ->orderBy('m.month_start')
                    ->get();

        return $data;
    }

    public function previousMonthOpensVsClicks(array $campaignIds): Collection
    {
        $opensVsClicks = DB::query()
                        ->from(DB::raw("
                            (
                                WITH RECURSIVE days AS (
                                    SELECT DATE(DATE_SUB(CURDATE(), INTERVAL 29 DAY)) AS day
                                    UNION ALL
                                    SELECT DATE_ADD(day, INTERVAL 5 DAY)
                                    FROM days
                                    WHERE day < CURDATE()
                                )
                                SELECT day FROM days
                            ) as d
                        "))
                        ->leftJoin('campaign_tracking_events as o', function ($join) use ($campaignIds) {
                            $join->on(
                                DB::raw("DATE(o.action_performed_at)"),
                                '=',
                                'd.day'
                            )
                            ->whereIn('o.campaign_id', $campaignIds)
                            ->where('o.type', 0); // opens
                        })
                        ->leftJoin('campaign_tracking_events as c', function ($join) use ($campaignIds) {
                            $join->on(
                                DB::raw("DATE(c.action_performed_at)"),
                                '=',
                                'd.day'
                            )
                            ->whereIn('c.campaign_id', $campaignIds)
                            ->where('c.type', 1); // clicks
                        })
                        ->selectRaw("
                            DATE_FORMAT(d.day, '%b %d') as date,
                            COUNT(DISTINCT o.id) as opens,
                            COUNT(DISTINCT c.id) as clicks
                        ")
                        ->groupBy('d.day')
                        ->orderBy('d.day')
                        ->get();

        return $opensVsClicks;
    }
}
