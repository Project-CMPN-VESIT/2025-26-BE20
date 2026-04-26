<?php
namespace App\Features\EmailTemplates\Http\v1\Controllers;

use App\Features\EmailTemplates\Domains\Data\UpdateStateData;
use App\Features\EmailTemplates\Domains\Data\EmailTemplateData;
use App\Features\EmailTemplates\Domains\Data\UpdateEmailTemplateData;
use App\Features\EmailTemplates\Domains\Data\UploadImageData;
use App\Features\EmailTemplates\Domains\Models\EmailTemplate;
use App\Features\EmailTemplates\Domains\Models\TemplateCategory;
use App\Features\EmailTemplates\Http\v1\Resources\EmailTemplateCollectionResource;
use App\Features\EmailTemplates\Http\v1\Resources\EmailTemplateResource;
use App\Features\EmailTemplates\Services\EmailTemplatesService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EmailTemplatesController
{
    public function __construct(private EmailTemplatesService $emailTemplatesService){}

    public function uploadImage(UploadImageData $data)
    {
        $filePath = $this->emailTemplatesService->uploadImage($data);
        return ResponseHandler::success($filePath,"Image Uploaded Successfully",Response::HTTP_OK);
    }
    
    public function index(Request $request):JsonResponse
    {
        $perPage = min((int) $request->input('per_page',10),100);
        $organizationId = auth('api')->user()->organization_id;
        $templates = $this->emailTemplatesService->getAllTemplates($perPage, $organizationId);
        return ResponseHandler::success(EmailTemplateCollectionResource::collect($templates), "All Templates!", Response::HTTP_OK);
    }

    public function show(EmailTemplate $emailTemplate)
    {
        $template = $this->emailTemplatesService->show($emailTemplate);
        return ResponseHandler::success(EmailTemplateResource::from($template->load('category')),"Template Fetched");
    }

    public function create(EmailTemplateData $data):JsonResponse
    {
        $createdTemplate =  $this->emailTemplatesService->create($data,auth('api')->user()->organization_id);
        return ResponseHandler::created(EmailTemplateResource::from($createdTemplate),"Template Created Successfully");
    }

    public function update(UpdateEmailTemplateData $data,EmailTemplate $emailTemplate):JsonResponse
    {
        $updatedTemplate =  $this->emailTemplatesService->update($data,$emailTemplate);
        return ResponseHandler::success(EmailTemplateResource::from($updatedTemplate),"Template Updated Successfully",Response::HTTP_OK);
    }

    public function delete(EmailTemplate $emailTemplate):JsonResponse
    {    
        return $this->emailTemplatesService->destroy($emailTemplate);
    }

    public function getTemplatesByCategory(Request $request, TemplateCategory $category)
    {
        $perPage = min((int) $request->input('per_page',10),100);
        $templates = $this->emailTemplatesService->getTemplatesByCategory($category, $perPage);
        
        return ResponseHandler::success(EmailTemplateCollectionResource::collect($templates), "All Templates for {$category->name} category",Response::HTTP_OK);
    }
    
    public function getAllTemplateStates(Request $request)
    {
        $states = $this->emailTemplatesService->getAllTemplateStates();

        return ResponseHandler::success($states,"All States of Templates",Response::HTTP_OK);
    }

    public function updateState(EmailTemplate $emailTemplate,UpdateStateData $data)
    {
        $updatedTemplate = $this->emailTemplatesService->updateState($emailTemplate,$data);
        
        return ResponseHandler::success(EmailTemplateResource::from($updatedTemplate->load('category')),"Template State updated successfully",Response::HTTP_OK);
    }

    public function getStateByTemplateId(EmailTemplate $emailTemplate)
    {
        $state = $this->emailTemplatesService->getStateByTemplateId($emailTemplate);
        return ResponseHandler::success($state,"State Fetched",Response::HTTP_OK);
    }
}