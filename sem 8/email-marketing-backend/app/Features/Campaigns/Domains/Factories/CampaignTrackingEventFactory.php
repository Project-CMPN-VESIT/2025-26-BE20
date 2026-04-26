<?php

namespace App\Features\Campaigns\Domains\Factories;

use App\Features\Campaigns\Domains\Enums\TrackingOptionEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\Campaigns\Domains\Models\CampaignTrackingEvent;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class CampaignTrackingEventFactory extends Factory
{
    protected $model = CampaignTrackingEvent::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $campaign = Campaign::all()->random();
        $segments = $campaign->segments;
        $contacts = $segments->flatMap(function ($segment) { return $segment->contacts; });
        return [
            'campaign_id' => $campaign->id,
            'type' => collect([TrackingOptionEnum::OPEN, TrackingOptionEnum::OPEN, TrackingOptionEnum::OPEN, TrackingOptionEnum::CLICK, TrackingOptionEnum::UNSUBSCRIBE, TrackingOptionEnum::SPAM])->random(),
            'action_performed_at' => Carbon::now('Asia/Kolkata')->subDays(random_int(0, 365)),
            'contact_id' => $contacts->random()->id
        ];
    }
}
