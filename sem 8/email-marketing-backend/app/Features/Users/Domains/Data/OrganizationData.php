<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class OrganizationData extends Data
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly int $phone_number,
        public readonly string $address,
        public readonly string $city,
        public readonly string $state,
        public readonly int $zip,
        public readonly string $country,
    ) { }

    public static function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'unique:organizations,name', 'regex:/^[a-zA-Z\s\-]+$/'],
            'email' => ['required', 'string', 'email', 'unique:organizations,email', 'max:255'],
            'phone_number' => ['required', 'int', 'digits:10', 'min:10'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'zip' => ['required', 'string', 'max:12', 'regex:/^[A-Za-z0-9\- ]+$/'],
            'country' => ['required', 'string', 'regex:/^[a-zA-Z\s\-]+$/']
        ];
    }

    public static function messages(): array
    {
        return [
            'name.required' => 'Organization name is required.',
            'name.string' => 'Organization name must be a valid string.',
            'name.max' => 'Organization name cannot exceed 255 characters.',
            'name.regex' => 'Organization name may only contain letters, spaces, and hyphens.',
            'name.unique' => 'Organization with this name already exists',

            'email.required' => 'Organization email address is required.',
            'email.string' => 'Organization email must be a valid string.',
            'email.email' => 'Please enter a valid organization email address.',
            'email.max' => 'Organization email cannot exceed 255 characters.',
            'email.unique' => 'Organization with this email already exists',

            'phone_number.required' => 'Phone number is required.',
            'phone_number.int' => 'Phone number must be a number.',
            'phone_number.digits' => 'Phone number must be exactly 10 digits.',
            'phone_number.min' => 'Phone number must be at least 10 digits.',

            'address.required' => 'Address is required.',
            'address.string' => 'Address must be a valid string.',
            'address.max' => 'Address cannot exceed 255 characters.',

            'city.required' => 'City is required.',
            'city.string' => 'City must be a valid string.',
            'city.max' => 'City cannot exceed 255 characters.',

            'state.required' => 'State is required.',
            'state.string' => 'State must be a valid string.',
            'state.max' => 'State cannot exceed 255 characters.',

            'zip.required' => 'ZIP code is required.',
            'zip.string' => 'ZIP code must be a string.',
            'zip.max' => 'ZIP code cannot exceed 12 characters.',
            'zip.regex' => 'ZIP code may only contain letters, numbers, spaces, and hyphens.',

            'country.required' => 'Country name is required.',
            'country.string' => 'Country name must be a valid string.',
            'country.regex' => 'Country name may only contain letters, spaces, and hyphens.',
        ];
    }

}

?>