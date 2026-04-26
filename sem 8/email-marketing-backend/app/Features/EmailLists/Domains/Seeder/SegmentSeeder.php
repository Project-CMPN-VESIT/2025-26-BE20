<?php

namespace App\Features\EmailLists\Domains\Seeder;

use App\Features\EmailLists\Domains\Factories\SegmentFactory;
use App\Features\EmailLists\Domains\Models\Contact;
use Illuminate\Database\Seeder;

class SegmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        (new SegmentFactory(20))->create()->each(function($segment) {
            $segment->contacts()->attach(
                Contact::pluck('id')->random(random_int(100, 1000))->all()
            );
        });
    }
}
