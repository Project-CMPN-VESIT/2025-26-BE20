<?php
namespace App\Features\EmailTemplates\Domains\Data;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class GetSingleTemplateData extends Data
{
    public function __construct(
        public string $templateId,
    ){}

    public static function rules():array
    {
        return [
            'templateId' => ['required','string','uuid',Rule::exists('predefined_templates','id')],
        ];
    }
}