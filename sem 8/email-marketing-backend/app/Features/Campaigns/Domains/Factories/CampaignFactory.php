<?php

namespace App\Features\Campaigns\Domains\Factories;

use App\Features\Campaigns\Domains\Enums\CampaignStatusEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\EmailTemplates\Domains\Models\PredefinedTemplate;
use App\Features\Users\Domains\Models\Organization;
use App\Features\Users\Domains\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class CampaignFactory extends Factory
{
    protected $model = Campaign::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $organizationId = Organization::all('id')->random()->id;
        return [
            'organization_id' => $organizationId,
            'user_id' => User::where('organization_id', $organizationId)->get()->random()->id,
            'name' => fake()->sentence(3),
            'subject' => fake()->sentence(6),
            'preheader' => fake()->sentence(8),
            'from_name' => fake()->name(),
            'from_email' => fake()->companyEmail(),
            'reply_to_email' => fake()->safeEmail(),
            'email_template_id' => PredefinedTemplate::all('id')->random()->id,
            'status' => CampaignStatusEnum::COMPLETED,
            'sent_at' => Carbon::yesterday(),
            'send_at' => Carbon::yesterday(),
            'total_recipients' => 100
        ];
    }
}
