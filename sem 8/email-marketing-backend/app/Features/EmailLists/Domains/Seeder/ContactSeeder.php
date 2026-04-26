<?php

namespace App\Features\EmailLists\Domains\Seeder;

use App\Features\EmailLists\Domains\Factories\ContactFactory;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        (new ContactFactory(10000))->create();
    }
}
