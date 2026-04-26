<?php

namespace App\Features\Campaigns\Domains\Data;

use App\Features\Campaigns\Domains\Enums\CampaignLogStatusEnum;
use Spatie\LaravelData\Data;

class CampaignLogData extends Data
{
    public function __construct(
        public string $campaign_id,
        public string $contact_id,
        public CampaignLogStatusEnum $status,
        public ?string $failure_reason
    ) { }
}

?>