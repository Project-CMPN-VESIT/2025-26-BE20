<?php

namespace App\Features\EmailLists\Domains\Data;

use Spatie\LaravelData\Data;
use Illuminate\Validation\Rule;

class AddRulesData extends Data
{
    public function __construct(
        public array $rules
    ) {}

    public static function rules(): array
    {
        return [
            'rules' => ['required', 'array'],
            'rules.*.field' => ['required', 'string',Rule::in(['email'])],
            'rules.*.operator' => ['required','string',Rule::in(['LIKE', 'EQUALS', 'NOT EQUALS', 'CONTAINS', 'NOT CONTAINS']),],
            'rules.*.value' => ['required','min:1'],
            'rules.*.condition_type' => ['nullable', 'in:AND,OR'],
        ];
    }

    public static function messages(): array
    {
        return [
            'rules.required' => 'The rules field is required and must be an array.',
            
            'rules.*.field.required' => 'Each rule must have a field.',
            'rules.*.field.string' => 'The field in each rule must be a string.',
            'rules.*.field.in' => 'The field is invalid.',


            'rules.*.operator.required' => 'Each rule must specify an operator.',
            'rules.*.operator.string' => 'The operator must be a string.',
            'rules.*.operator.in' => 'The operator must be one of: LIKE, EQUALS, NOT EQUALS, CONTAINS, NOT CONTAINS.',

            'rules.*.value.required' => 'Each rule must have a value.',
            'rules.*.value.min' => 'No valid value found for rule',

            'rules.*.condition_type.in' => 'The condition_type must be either AND or OR.',
        ];
    }
}
