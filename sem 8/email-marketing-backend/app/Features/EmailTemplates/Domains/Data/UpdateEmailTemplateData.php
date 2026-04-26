<?php

namespace App\Features\EmailTemplates\Domains\Data;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class UpdateEmailTemplateData extends Data
{
    public function __construct(
        public string $name,
        public string $template_category_id,
        public ?string $html_content,
        public ?array $json_design,
    ) {}

    public static function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'template_category_id' => ['sometimes', 'uuid', Rule::exists('template_categories', 'id')],
            'html_content' => ['nullable', 'string'],
            'json_design' => ['nullable', 'array'],
        ];
    }
}
