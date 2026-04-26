<?php
namespace App\Features\EmailTemplates\Http\v1\Resources;
use Spatie\LaravelData\Resource;

class TemplateCategoryResource extends Resource
{
    public function __construct(
        public string $id,
        public string $name
    ){}
}