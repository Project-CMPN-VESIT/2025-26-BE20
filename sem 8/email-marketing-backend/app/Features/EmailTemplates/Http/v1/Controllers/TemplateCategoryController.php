<?php

namespace App\Features\EmailTemplates\Http\v1\Controllers;

use App\Features\EmailTemplates\Services\TemplateCategoryService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TemplateCategoryController
{
    public function __construct(private TemplateCategoryService $templateCategoryService){}

    public function index(Request $request):JsonResponse
    {
        $perPage = min((int)$request->input('per_page',10),100);
        $categories =  $this->templateCategoryService->getAllCategories($perPage);
        return ResponseHandler::success($categories,"All Categories",Response::HTTP_OK);
    }

}
