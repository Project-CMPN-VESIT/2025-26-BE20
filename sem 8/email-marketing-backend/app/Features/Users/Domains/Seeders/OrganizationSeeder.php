<?php

namespace App\Features\Users\Domains\Seeders;

use App\Features\Plans\Domains\Models\Subscription;
use App\Features\Users\Domains\Models\Organization;
use App\Features\Users\Domains\Models\Settings;
use App\Features\Users\Domains\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizationId = Str::uuid();

        Organization::create([
            'id' => $organizationId,
            'name' => 'Study Link Classes',
            'email' => 'marketing@horizoninfolabs.com',
            'phone_number' => 9321669624,
            'address' => '201, Gaurav Plaza, RRT Road',
            'city' => 'Mulund',
            'state' => 'Maharashtra',
            'zip' => 400080,
            'country' => 'India'
        ]);

        User::create([
            'first_name' => 'Tushar',
            'last_name' => 'Sawant',
            'organization_id' => $organizationId,
            'email' => 'sawant.tushar@gmail.com',
            'password' => 'abcd1234'
        ]);

        Subscription::create([
            'plan_id' => '01978c58-ed4f-736c-8ebb-4d62a11487cb',
            'organization_id' => $organizationId,
            'start_date' => Carbon::now('Asia/Kolkata'),
            'end_date' => Carbon::now('Asia/Kolkata')->addDays(30),
            'trial_ends_at' => Carbon::now('Asia/Kolkata')->addDays(30)
        ]);

        Settings::create([
            'organization_id' => $organizationId,
            'sender_name' => 'Study Link Classes',
            'sender_email' => 'marketing@horizoninfolabs.com'
        ]);
    }
}
