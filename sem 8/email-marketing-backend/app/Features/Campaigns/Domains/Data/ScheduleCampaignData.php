<?php

namespace App\Features\Campaigns\Domains\Data;

use App\Features\Campaigns\Domains\Enums\CampaignStatusEnum;
use DateTime;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;

class ScheduleCampaignData extends Data
{
    public function __construct(
        public ?DateTime $send_at,
        public ?CampaignStatusEnum $status
    ) { 
        $this->status = CampaignStatusEnum::SCHEDULED;
        if(is_null($this->send_at)) {
            $this->send_at = Carbon::now('Asia/Kolkata');
        }
    }

    public static function rules(): array
    {
        return [
            'send_at' => ['sometimes', 'date'],
        ];
    }
}

?>