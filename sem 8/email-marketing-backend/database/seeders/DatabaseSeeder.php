<?php

namespace Database\Seeders;

use App\Features\Campaigns\Domains\Seeders\CampaignLogSeeder;
use App\Features\Campaigns\Domains\Seeders\CampaignSeeder;
use App\Features\Campaigns\Domains\Seeders\CampaignTrackingEventSeeder;
use App\Features\EmailLists\Domains\Seeder\ContactSeeder;
use App\Features\EmailLists\Domains\Seeder\SegmentSeeder;
use App\Features\EmailTemplates\Domains\Seeders\PredefinedTemplateSeeder;
use App\Features\EmailTemplates\Domains\Seeders\TemplateCategorySeeder;
use App\Features\Plans\Domains\Seeders\PlanSeeder;
use App\Features\Users\Domains\Seeders\OrganizationSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(PlanSeeder::class);
        $this->call(OrganizationSeeder::class);
        $this->call(TemplateCategorySeeder::class);
        $this->call(PredefinedTemplateSeeder::class);
        $this->call(ContactSeeder::class);
        $this->call(SegmentSeeder::class);
        $this->call(CampaignSeeder::class);
        $this->call(CampaignTrackingEventSeeder::class);
        $this->call(CampaignLogSeeder::class);
    }
}
