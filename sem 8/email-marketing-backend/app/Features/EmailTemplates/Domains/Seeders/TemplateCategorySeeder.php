<?php

namespace App\Features\EmailTemplates\Domains\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TemplateCategorySeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now('Asia/Kolkata');

        $categories = [
            [
                'id' => Str::uuid(),
                'name' => 'Marketing',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Promotional',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Newsletter',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Feedback',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Other',
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        DB::table('template_categories')->insert($categories);
    }
}
