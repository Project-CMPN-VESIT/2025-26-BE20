<?php

namespace App\Features\Campaigns\Domains\Seeders;

use App\Features\Campaigns\Domains\Enums\CampaignLogStatusEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\Campaigns\Domains\Models\CampaignLog;
use Illuminate\Database\Seeder;

class CampaignLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $campaigns = Campaign::all();
        $campaigns->each(function ($campaign) {
            $segments = $campaign->segments;
            $contacts = $segments->flatMap(function ($segment) { return $segment->contacts; });

            $contacts->each(function ($contact) use ($campaign) {
                $isSuccessfull = random_int(1, 10) > 7 ? false : true;

                if($isSuccessfull) {
                    CampaignLog::create([
                        'campaign_id' => $campaign->id,
                        'contact_id' => $contact->id,
                        'status' => CampaignLogStatusEnum::SENT
                    ]);
                } else {
                    CampaignLog::create([
                        'campaign_id' => $campaign->id,
                        'contact_id' => $contact->id,
                        'status' => CampaignLogStatusEnum::FAILED
                    ]);
                }
            });
        });
    }
}
