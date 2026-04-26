<?php

namespace App\Features\EmailTemplates\Services;

use App\Features\EmailTemplates\Domains\Data\UpdateStateData;
use App\Features\EmailTemplates\Domains\Data\EmailTemplateData;
use App\Features\EmailTemplates\Domains\Data\UpdateEmailTemplateData;
use App\Features\EmailTemplates\Domains\Data\UploadImageData;
use App\Features\EmailTemplates\Domains\Enums\TemplateState;
use App\Features\EmailTemplates\Domains\Models\EmailTemplate;
use App\Features\EmailTemplates\Domains\Models\PredefinedTemplate;
use App\Features\EmailTemplates\Domains\Models\TemplateCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Str;
use PhpParser\Node\Stmt\Global_;

class EmailTemplatesService
{
    public function __construct(
        public EmailTemplate $emailTemplate,
        public ThumbnailService $thumbnailService,
        public PredefinedTemplate $predefinedTemplate
    ) { }

    public function getAllTemplates(int $perPage, string $organizationId): LengthAwarePaginator
    {
        return $this->emailTemplate->getAllTemplates($perPage, $organizationId);
    }
    /**
     * uploadImage: To upload image to the server and get the corresponding softlink for it  
     *
     * @param UploadImageData $data
     * @return string
     */
    public function uploadImage(UploadImageData $data): string
    {
        return $this->emailTemplate->uploadImage($data);
    }

    /**
     * Undocumented function
     *
     * @param EmailTemplateData $data
     * @return EmailTemplate
     */
    public function create(EmailTemplateData $data,string $organization_id): EmailTemplate
    {   
        return $this->emailTemplate->persistEmailTemplate($data,$organization_id);
    }

    public function show(EmailTemplate $emailTemplate)
    {
        return $template = $this->emailTemplate->findOrFail($emailTemplate->id);
    }
    public function update(UpdateEmailTemplateData $data, EmailTemplate $emailTemplate): EmailTemplate
    {
        return $this->emailTemplate->updateEmailTemplate($data,$emailTemplate,$this->thumbnailService);
    }

    public function destroy(EmailTemplate $emailTemplate): JsonResponse
    {
        return $this->emailTemplate->deleteTemplate($emailTemplate);
    }

    public function getAllTemplateStates()
    {
        $states = collect(TemplateState::cases());
        return $states;
    }

    public function updateState(EmailTemplate $emailTemplate,UpdateStateData $data)
    {
        return $this->emailTemplate->updateState($emailTemplate,$data);
    }


    public function getTemplatesByCategory(TemplateCategory $category, int $perPage = 10): LengthAwarePaginator
    {
        $template = $this->emailTemplate->with('category')->where('template_category_id',$category->id)->paginate($perPage);
        return $template;
    }

    public function getStateByTemplateId(EmailTemplate $emailTemplate)
    {
        return $this->emailTemplate->where('id',$emailTemplate->id)->first()->state;
    }
}