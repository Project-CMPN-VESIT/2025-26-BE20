<?php

namespace App\Features\EmailLists\Domains\Factories;

use App\Features\EmailLists\Domains\Models\Contact;
use App\Features\Users\Domains\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class ContactFactory extends Factory
{
    protected $model = Contact::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = Carbon::now('Asia/Kolkata')->subDays(random_int(0, 365));
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->firstName() . fake()->lastName() . random_int(1, 1000) . "@gmail.com",
            'email_verified_at' => Carbon::now('Asia/Kolkata'),
            'organization_id' => Organization::all('id')->random()->id,
            'created_at' => $date,
            'updated_at' => $date     
        ];
    }
}
