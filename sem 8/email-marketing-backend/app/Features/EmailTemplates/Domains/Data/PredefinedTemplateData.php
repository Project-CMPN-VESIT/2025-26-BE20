<?php
namespace App\Features\EmailTemplates\Domains\Data;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class PredefinedTemplateData extends Data
{
    public function __construct(
        public string $name,
        public string $template_category_id,
        public ?string $html_content,
        public ?array $json_design,
    ){}

    public static function rules():array
    {
        return [
            'name' => ['required','string','max:255',Rule::unique('predefined_templates','name')],
            'template_category_id' => ['required','string','uuid',Rule::exists('template_categories','id')],
            'html_content' => ['required','string','regex:/<[^>]+>/'],
            'json_design' => ['required','array',],
        ];
    }
}