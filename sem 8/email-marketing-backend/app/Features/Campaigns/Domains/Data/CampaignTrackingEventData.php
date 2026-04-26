<?php

namespace App\Features\Campaigns\Domains\Data;

use App\Features\Campaigns\Domains\Enums\TrackingOptionEnum;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;

class CampaignTrackingEventData extends Data
{
    public function __construct(
        public string $campaign_id,
        public TrackingOptionEnum $type,
        public Carbon $action_performed_at,
        public string $contact_id
    ) { }
}