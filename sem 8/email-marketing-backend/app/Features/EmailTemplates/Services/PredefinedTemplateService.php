<?php

namespace App\Features\EmailTemplates\Services;

use App\Features\EmailTemplates\Domains\Data\PredefinedTemplateData;
use App\Features\EmailTemplates\Domains\Models\PredefinedTemplate;
use App\Features\EmailTemplates\Domains\Data\UpdateStateData;
use Illuminate\Support\Facades\Storage;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Str;

class PredefinedTemplateService
{

    public function __construct(public PredefinedTemplate $predefinedTemplate,public ThumbnailService $thumbnailService){}
    
    public function getAllTemplates(int $perPage)
    {
        return $this->predefinedTemplate->getAllTemplates($perPage);
    }

    public function createTemplate(PredefinedTemplateData $data,string $organization_id): PredefinedTemplate
    {
        $relativePath = null;
        if ($data->html_content !== null) {
            $filename = Str::slug($data->name) . '-' . now()->timestamp . '.png';
            $relativePath = "thumbnails/{$filename}";
            $tempPath = Storage::disk('public')->path($relativePath);


            Browsershot::html($data->html_content)
                ->windowSize(1920, 800)
                ->fullPage()
                ->addChromiumArguments(['no-sandbox', 'disable-setuid-sandbox'])
                ->save($tempPath); // Browsershot can only capture screenshots from localdisks

            Storage::disk(config('filesystems.default'))->put($relativePath,file_get_contents($tempPath),'public');
            unlink($tempPath);
        }
        return $this->predefinedTemplate->persistPredefinedTemplate($data,$organization_id,$relativePath);
    }

    public function getTemplateById(PredefinedTemplate $predefinedTemplate): PredefinedTemplate
    {
        return $this->predefinedTemplate->getTemplateById($predefinedTemplate);
    }

    public function update(PredefinedTemplateData $data, PredefinedTemplate $predefinedTemplate): PredefinedTemplate
    {   
        return $this->predefinedTemplate->updatePredefinedTemplate($data,$predefinedTemplate,$this->thumbnailService);
    }

    public function updateState(PredefinedTemplate $predefinedTemplate,UpdateStateData $data)
    {
        return $this->predefinedTemplate->updateState($predefinedTemplate,$data);
    }

    public function getStateByTemplateId(PredefinedTemplate $predefinedTemplate)
    {
        return $this->predefinedTemplate->getStateByTemplateId($predefinedTemplate);
    }
}
