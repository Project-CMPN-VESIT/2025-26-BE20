<?php

namespace App\Features\Plans\Domains\Seeders;

use App\Features\Plans\Domains\Enums\PlanBillingEnum;
use App\Features\Plans\Domains\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'id' => '01978c58-ed4f-736c-8ebb-4d62a11487cb',
                'name' => 'Free',
                'billing' => PlanBillingEnum::fromString('free'),
                'price' => 0,
                'currency' => 'USD',
                'email_limit' => 12000,
                'subscriber_limit' => 1000,
                'features' => [
                    'Drag & drop editor',
                    'Email automation builder',
                    'Websites',
                    '10 landing pages',
                    'Comparative reporting',
                    'Signup forms & pop-ups'
                ],
                'is_active' => true
            ],
            [
                'id' => '0197abae-74bf-717b-b068-781a7c89aea6',
                'name' => 'Growing Business',
                'billing' => PlanBillingEnum::fromString('monthly'),
                'price' => 289,
                'currency' => 'USD',
                'email_limit' => -1,
                'subscriber_limit' => 50000,
                'features' => [
                    'Sell digital products',
                    'Unlimited templates',
                    'Dynamic emails',
                    'Campaign auto-resend',
                    'Multivariate testing',
                    'Unlimited websites & blogs',
                    'Unlimited landing pages',
                    'Unsubscribe page builder'
                ],
                'is_active' => true
            ],
            [
                'id' => '0197abae-74c0-71c5-ae6d-c6846d91d05b',
                'name' => 'Advanced',
                'billing' => PlanBillingEnum::fromString('monthly'),
                'price' => 1900,
                'currency' => 'USD',
                'email_limit' => 6000000,
                'subscriber_limit' => 50000,
                'features' => [
                    'Smart sending',
                    'Facebook integration',
                    'Custom HTML editor',
                    'Promotion pop-ups',
                    'Enhanced automations',
                    'Preference center',
                    'AI writing assistant',
                    'Partner discounts'
                ],
                'is_active' => true
            ],
            [
                'id' => '0197abae-74c1-70f5-920d-291d4e347212',
                'name' => 'Growing Business',
                'billing' => PlanBillingEnum::fromString('yearly'),
                'price' => 260,
                'currency' => 'USD',
                'email_limit' => -1,
                'subscriber_limit' => 50000,
                'features' => [
                    'Sell digital products',
                    'Unlimited templates',
                    'Dynamic emails',
                    'Campaign auto-resend',
                    'Multivariate testing',
                    'Unlimited websites & blogs',
                    'Unlimited landing pages',
                    'Unsubscribe page builder'
                ],
                'is_active' => true
            ],
            [
                'id' => '0197abae-74bd-726e-90f3-f100f54e6341',
                'name' => 'Advanced',
                'billing' => PlanBillingEnum::fromString('yearly'),
                'price' => 1710,
                'currency' => 'USD',
                'email_limit' => 6000000,
                'subscriber_limit' => 50000,
                'features' => [
                    'Smart sending',
                    'Facebook integration',
                    'Custom HTML editor',
                    'Promotion pop-ups',
                    'Enhanced automations',
                    'Preference center',
                    'AI writing assistant',
                    'Partner discounts'
                ],
                'is_active' => true
            ]
        ];

        foreach($plans as $plan) {
            Plan::create($plan);
        }
    }
}
