<?php

namespace App\Features\Users\Domains\Data;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class UpdateOrganizationData extends Data
{
    public function __construct(
        public readonly string $name,
        public readonly int $phone_number,
        public readonly string $address,
        public readonly string $city,
        public readonly string $state,
        public readonly int $zip,
        public readonly string $country
    ) { }

    public static function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-]+$/', Rule::unique('organizations', 'name')->ignore(auth('api')->user()->organization_id),],
            'phone_number' => ['nullable', 'int', 'digits:10', 'min:10', Rule::unique('organizations', 'phone_number')->ignore(auth('api')->user()->organization_id),],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:255'],
            'zip' => ['nullable', 'string', 'max:12', 'regex:/^[A-Za-z0-9\- ]+$/'],
            'country' => ['nullable', 'string', 'regex:/^[a-zA-Z\s\-]+$/'],
        ];
    }

    public static function messages(): array
    {
        return [
            'name.string' => 'Organization name must be a valid string.',
            'name.max' => 'Organization name cannot exceed 255 characters.',
            'name.regex' => 'Organization name may only contain letters, spaces, and hyphens.',
            'name.unique' => 'Organization with this name already exists',

            'phone_number.int' => 'Phone number must be a number.',
            'phone_number.digits' => 'Phone number must be exactly 10 digits.',
            'phone_number.min' => 'Phone number must be at least 10 digits.',
            'email.unique' => 'Organization with this phone number already exists',

            'address.string' => 'Address must be a valid string.',
            'address.max' => 'Address cannot exceed 255 characters.',

            'city.string' => 'City must be a valid string.',
            'city.max' => 'City cannot exceed 255 characters.',

            'state.string' => 'State must be a valid string.',
            'state.max' => 'State cannot exceed 255 characters.',

            'zip.string' => 'ZIP code must be a string.',
            'zip.max' => 'ZIP code cannot exceed 12 characters.',
            'zip.regex' => 'ZIP code may only contain letters, numbers, spaces, and hyphens.',

            'country.string' => 'Country name must be a valid string.',
            'country.regex' => 'Country name may only contain letters, spaces, and hyphens.',
        ];
    }
}

?>