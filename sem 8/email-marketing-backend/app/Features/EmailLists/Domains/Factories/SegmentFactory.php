<?php

namespace App\Features\EmailLists\Domains\Factories;

use App\Features\EmailLists\Domains\Models\Segment;
use App\Features\Users\Domains\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Model>
 */
class SegmentFactory extends Factory
{
    protected $model = Segment::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organization_id' => Organization::all('id')->random()->id,
            'name' => fake()->name()
        ];
    }
}
