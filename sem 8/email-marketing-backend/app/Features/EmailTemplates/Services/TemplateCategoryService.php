<?php
namespace App\Features\EmailTemplates\Services;

use App\Features\EmailTemplates\Domains\Models\TemplateCategory;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

class TemplateCategoryService
{
    public function __construct(public TemplateCategory $templateCategory){}

    public function getAllCategories(int $perPage):LengthAwarePaginator
    {
        return $this->templateCategory->getAllCategories($perPage);
    }
}