<?php

namespace App\Features\EmailTemplates\Domains\Models;

use App\Features\EmailTemplates\Domains\Data\UpdateStateData;
use App\Features\EmailTemplates\Domains\Data\EmailTemplateData;
use App\Features\EmailTemplates\Domains\Data\UpdateEmailTemplateData;
use App\Features\EmailTemplates\Domains\Data\UploadImageData;
use App\Features\EmailTemplates\Domains\Enums\TemplateState;
use App\Features\EmailTemplates\Services\ThumbnailService;
use App\Handlers\ResponseHandler;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Str;

class EmailTemplate extends Template
{
    use SoftDeletes;

    protected $casts = [
        'design_json' => 'array',
        'state' => TemplateState::class,
    ];

    public function category()
    {
        return $this->belongsTo(TemplateCategory::class, 'template_category_id');
    }

    public function getAllTemplates(int $perPage = 10, string $organizationId)
    {

        $templates = $this::with('category')->where('organization_id', $organizationId)->paginate($perPage);

        return $templates;
    }

    public function persistEmailTemplate(EmailTemplateData $data, string $organization_id)
    {
        $template = EmailTemplate::create([
            'name' => $data->name,
            'organization_id' => $organization_id,
            'template_category_id' => $data->template_category_id,
            'state' => TemplateState::CREATE,
        ]);

        return $template->load('category');
    }

    public function updateEmailTemplate(UpdateEmailTemplateData $data, EmailTemplate $emailTemplate,ThumbnailService $thumbnailService)
    {
        $updatedTemplate = DB::transaction(function () use ($data, $emailTemplate,$thumbnailService) {

            $emailTemplate->update([
                'name' => $data->name,
                'template_category_id' => $data->template_category_id,
            ]);

            if ($data->html_content !== null) {

                if($emailTemplate->thumbnail_url) {
                    if (Storage::exists($emailTemplate->thumbnail_url)) {
                        Storage::delete($emailTemplate->thumbnail_url);
                    }
                }

                $relativePath = $thumbnailService->generateThumbnail($data->html_content,$emailTemplate->name);  
                $emailTemplate->update([
                    'html_content' => $data->html_content,
                    'design_json' => $data->json_design,
                    'thumbnail_url' => $relativePath,
                ]);
            }
            return $emailTemplate->load('category');
        });

        return $updatedTemplate;
    }

    public function deleteTemplate(EmailTemplate $emailTemplate)
    {
        $template = $this->findOrFail($emailTemplate);
        $template->delete();
        return ResponseHandler::success(null, "Template Deleted Successfully!", Response::HTTP_OK);
    }

    public function uploadImage(UploadImageData $data)
    {
        $filePath = $data->file->store('uploaded-images', config('filesystems.default'));
        return (Storage::url($filePath));
    }

    public function updateState(EmailTemplate $emailTemplate, UpdateStateData $data)
    {
        $emailTemplate->update([
            'state' => $data->state
        ]);

        return $emailTemplate;
    }

    /**
     * Setting slug with respect to the template name
     *
     * @param string $name
     * @return void
     */
    protected function setNameAttribute(string $name)
    {
        $this->attributes['name'] = $name;
        $this->attributes['slug'] = Str::slug($name);
    }
}
