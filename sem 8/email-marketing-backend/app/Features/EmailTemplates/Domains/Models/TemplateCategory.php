<?php

namespace App\Features\EmailTemplates\Domains\Models;

use App\Support\Models\BaseModel;
use Illuminate\Pagination\LengthAwarePaginator;

class TemplateCategory extends BaseModel
{

    public function templates()
    {
        return $this->hasMany(EmailTemplate::class);
    }

    public function predefinedTemplates()
    {
        return $this->hasMany(PredefinedTemplate::class);
    }

    public function getAllCategories(int $perPage):LengthAwarePaginator
    {
        return $this::paginate($perPage);
    }
}   
