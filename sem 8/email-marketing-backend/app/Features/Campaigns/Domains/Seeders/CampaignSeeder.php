<?php

namespace App\Features\Campaigns\Domains\Seeders;

use App\Features\Campaigns\Domains\Factories\CampaignFactory;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\EmailLists\Domains\Models\Segment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        (new CampaignFactory(20))->create()->each(function($campaign) {
            $campaign->segments()->attach(
                Segment::pluck('id')->random(2)->all()
            );
        });
    }
}
