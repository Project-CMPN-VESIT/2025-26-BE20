<?php

namespace App\Features\EmailLists\Domains\Data;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class ContactData extends Data
{
    public function __construct(
        public string $first_name,
        public string $last_name,
        public string $email,
    ){}

    public function getRules():array
    {
        return [
            'email' => ['required','string','email','min:6',Rule::unique('contacts','email')],
            'first_name' => ['required','string','max:255','regex:/^[^0-9]*$/','min:2'],
            'last_name' => ['required','string','max:255','regex:/^[^0-9]*$/','min:2'],
        ];
    }

    public static function messages():array
    {
        return [
            'email.required' => 'The Email Field is required',
            'email.string' => 'The Email must be of type string',
            'email.email' => 'The Email must be an valid email',
            'email.unique' => 'The contact with such email already exists',
            'email.min' => 'The email should contain atleast 6 characters',

            'first_name.required' => 'The First name field is required',
            'first_name.string' => 'The first name field should be of type string',
            'first_name.max' => 'The first name should only contain max 256 characters',
            'first_name.regex' => 'The first name must not contain any numbers.',
            'first_name.min' => 'The first name should be of min 2 characters',

            'last_name.required' => 'The last name field is required.',
            'last_name.string' => 'The last name field should be of type string',
            'last_name.max' => 'The last name should only contain max 256 characters',
            'last_name.regex' => 'The last name must not contain any numbers.',
            'last_name.min' => 'The last name should be of min 2 characters',

        ];
    }
}