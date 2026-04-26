<?php
namespace App\Features\EmailTemplates\Domains\Data;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class EmailTemplateData extends Data
{
    public function __construct(
        public string $name,
        public string $template_category_id,
    ) {}

    public static function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255','unique:email_templates,name'],
            'template_category_id' => ['required', 'uuid','exists:template_categories,id'], 
        ];
    }
}
