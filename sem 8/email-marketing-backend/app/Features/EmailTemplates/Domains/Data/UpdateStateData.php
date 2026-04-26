<?php
namespace App\Features\EmailTemplates\Domains\Data;

use App\Features\EmailTemplates\Domains\Enums\TemplateState;
use Illuminate\Validation\Rules\Enum;
use Spatie\LaravelData\Data;


class UpdateStateData extends Data
{
    public function __construct(
        public string $state,
    ){}

    public static function rules()
    {
        return [
            'state' => ['required','string',new Enum(TemplateState::class)],
        ];
    }

    public static function messages()
    {
        return [
            'state.required' => 'The State field is required',
            'state.string' => 'The state must be of type string',
        ];
    }
}