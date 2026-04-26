<?php

namespace App\Features\EmailTemplates\Http\v1\Controllers;

use App\Features\EmailLists\Domains\Data\UpdateStateData;
use App\Features\EmailTemplates\Domains\Data\GetSingleTemplateData;
use App\Features\EmailTemplates\Domains\Data\PredefinedTemplateData;
use App\Features\EmailTemplates\Domains\Models\PredefinedTemplate;
use App\Features\EmailTemplates\Http\v1\Resources\EmailTemplateResource;
use App\Features\EmailTemplates\Services\PredefinedTemplateService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PredefinedTemplatesController
{
    public function __construct(public PredefinedTemplateService $predefinedTemplateService){}

    public function create(PredefinedTemplateData $data)
    {
        $template = $this->predefinedTemplateService->createTemplate($data,auth('api')->user()->organization_id);
    
        return ResponseHandler::created(EmailTemplateResource::from($template),"Template Created Successfully");
    }

    public function index(Request $request)
    {
        $perPage = min((int)$request->input('per_page'),100);
        $templates = $this->predefinedTemplateService->getAllTemplates($perPage);
        return ResponseHandler::success(EmailTemplateResource::collect($templates),"All Templates");
    }

    public function show(PredefinedTemplate $predefinedTemplate){
        $template = $this->predefinedTemplateService->getTemplateById($predefinedTemplate);

        return ResponseHandler::success(EmailTemplateResource::from($template)->except('created_at','updated_at'),"Template Fetched!");
    }

    public function update(PredefinedTemplateData $data,PredefinedTemplate $predefinedTemplate)
    {
        $updatedTemplate = $this->predefinedTemplateService->update($data,$predefinedTemplate);

        return ResponseHandler::success(EmailTemplateResource::from($updatedTemplate),"Templated Updated Successfully!");
    }

    public function updateState(PredefinedTemplate $predefinedTemplate,UpdateStateData $data)
    {
        $updatedTemplate = $this->predefinedTemplateService->updateState($predefinedTemplate,$data);
        return ResponseHandler::success(EmailTemplateResource::from($updatedTemplate->load('category')),"State Updated Successfully");
    }

    public function getStateByTemplateId(PredefinedTemplate $predefinedTemplate)
    {
        $state = $this->predefinedTemplateService->getStateByTemplateId($predefinedTemplate);
        return ResponseHandler::success($state,"State Fetched!");
    }
}
