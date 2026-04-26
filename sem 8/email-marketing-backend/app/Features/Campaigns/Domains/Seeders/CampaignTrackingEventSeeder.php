<?php

namespace App\Features\Campaigns\Domains\Seeders;

use App\Features\Campaigns\Domains\Factories\CampaignTrackingEventFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CampaignTrackingEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        (new CampaignTrackingEventFactory(10000))->create();
    }
}
