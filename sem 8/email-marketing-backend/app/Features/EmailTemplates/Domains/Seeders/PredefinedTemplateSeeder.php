<?php

namespace App\Features\EmailTemplates\Domains\Seeders;

use App\Features\EmailTemplates\Domains\Models\PredefinedTemplate;
use App\Features\EmailTemplates\Domains\Models\TemplateCategory;
use App\Features\EmailTemplates\Services\ThumbnailService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PredefinedTemplateSeeder extends Seeder
{
    public function __construct( protected ThumbnailService $thumbnailService) {}

    public function run(): void
    {
        $templates = [
            [
                'name' => 'Abundant Cart',
                'folder' => 'abundant-cart',
                'category' => 'Marketing',
            ],
            [
                'name' => 'Product Promotion',
                'folder' => 'product-promotion',
                'category' => 'Promotional',
            ],
            [
                'name' => 'Weekly Offer',
                'folder' => 'weekly-offer',
                'category' => 'Feedback',
            ],
        ];

        foreach ($templates as $template) {
            DB::transaction(function () use ($template) {

                $basePath = "predefined/{$template['folder']}";
                $htmlPath = "{$basePath}/{$template['folder']}.html";
                $jsonPath = "{$basePath}/{$template['folder']}.json";

                if (!Storage::disk('r2')->exists($htmlPath) || !Storage::disk('r2')->exists($jsonPath)) {
                    throw new \Exception("Template files missing on R2 for {$template['name']}");
                }

                $htmlContent = Storage::disk('r2')->get($htmlPath);
                $jsonContent = Storage::disk('r2')->get($jsonPath);

                $categoryId = TemplateCategory::where('name', $template['category'])->value('id');

                $predefinedTemplate = PredefinedTemplate::updateOrCreate(
                    ['name' => $template['name']],
                    [
                        'html_content' => $htmlContent,
                        'design_json' => $jsonContent,
                        'template_category_id' => $categoryId,
                    ]
                );

                if (!$predefinedTemplate->thumbnail_url) {
                    $thumbnailUrl = $this->thumbnailService->generateThumbnail(
                        $htmlContent,
                        $template['name']
                    );

                    $predefinedTemplate->update([
                        'thumbnail_url' => $thumbnailUrl,
                    ]);
                }
            });
        }
    }
}
