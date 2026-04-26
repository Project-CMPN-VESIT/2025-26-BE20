<?php

namespace App\Features\EmailTemplates\Domains\Models;

use App\Features\EmailTemplates\Domains\Data\GetSingleTemplateData;
use App\Features\EmailTemplates\Domains\Data\PredefinedTemplateData;
use App\Features\EmailTemplates\Domains\Data\UpdateStateData;
use App\Features\EmailTemplates\Domains\Enums\TemplateState;
use App\Features\EmailTemplates\Services\ThumbnailService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PredefinedTemplate extends Template
{
    
    protected $casts = [
        'design_json' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(TemplateCategory::class,'template_category_id');
    }

    /**
     * Persists the templates into database
     *
     * @param PredefinedTemplateData $data
     * @return self
     */
    public function persistPredefinedTemplate(PredefinedTemplateData $data,string $organization_id,?string $path):self
    {
        $template = $this::create([
            'id' => Str::uuid(),
            'name' => $data->name,
            'organization_id' => $organization_id,
            'template_category_id' => $data->template_category_id,
            'html_content' => $data->html_content,
            'design_json' => $data->json_design,
            'thumbnail_url' => $path!== null ? $path : null,
            'state' => TemplateState::CREATE,
        ]);
        return $template->load('category');
    
    }
    /**
     * Returns the 
     *
     * @param GetSingleTemplateData $data
     * @return self
     */
    public function getTemplateById(PredefinedTemplate $predefinedTemplate):self
    {
        return $predefinedTemplate->load('category');
    }

    public function updatePredefinedTemplate(PredefinedTemplateData $data, self $predefinedTemplate,ThumbnailService $thumbnailService): self
    {   
        $updatedTemplate = DB::transaction(function () use ($data, $predefinedTemplate,$thumbnailService) {

            $predefinedTemplate->update([
                'name' => $data->name,
                'template_category_id' => $data->template_category_id,
            ]);

            if ($data->html_content !== null) {

                if($predefinedTemplate->thumbnail_url) {
                    if (Storage::exists($predefinedTemplate->thumbnail_url)) {
                        Storage::delete($predefinedTemplate->thumbnail_url);
                    }
                }

                $relativePath = $thumbnailService->generateThumbnail($data->html_content,$predefinedTemplate->name);  

                $predefinedTemplate->update([
                    'html_content' => $data->html_content,
                    'design_json' => $data->json_design,
                    'thumbnail_url' => $relativePath
                ]);
            }
            return $predefinedTemplate->load('category');
        });

        return $updatedTemplate;

    }

    public function getAllTemplates(int $perPage)
    {
        return $this::with('category')
                    ->paginate($perPage)
                    ->through(fn ($template) => collect($template)->except(['html_content', 'design_json']));

    }

    public function updateState(PredefinedTemplate $predefinedTemplate,UpdateStateData $data)
    {   
        $predefinedTemplate->update([
            'state' => $data->state
        ]);

        return $predefinedTemplate;
    }

    public function getStateByTemplateId(PredefinedTemplate $predefinedTemplate)
    {   
        return $predefinedTemplate->state;
    }
}
