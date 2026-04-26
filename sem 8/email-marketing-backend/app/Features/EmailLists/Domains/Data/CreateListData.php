<?php

namespace App\Features\EmailLists\Domains\Data;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;

class CreateListData extends Data
{
    public function __construct(
        #[Max(255)]
        public string $name,
        public string $description,
    )
    {}

    public static function rules():array
    {
        return[
            'name' => ['required','string',Rule::unique('email_lists','name'),'max:255'],
            'description' => ['required','string'],
        ];
    }

    public static function messages():array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name field must be of type string',
            'name.unique' => 'List with such name already exists',
            'name.max' => 'The name field should have less than 256 characters',

            'description.required' => 'The description field is required',
            'description.string' => 'The description must be of type string',
        ];
    }
}