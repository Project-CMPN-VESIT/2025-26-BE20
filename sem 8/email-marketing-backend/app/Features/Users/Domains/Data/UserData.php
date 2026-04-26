<?php

namespace App\Features\Users\Domains\Data;

use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public readonly string $first_name,
        public readonly string $last_name,
        public readonly string $email,
        public readonly string $password,
        public ?Carbon $email_verified_at
    ) { }

    public static function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-]+$/'],
            'last_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-]+$/'],
            'organization_id' => ['nullable', 'uuid'],
            'email' => ['required', 'string', 'email:rfc,dns', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ];
    }

    public static function messages(): array
    {
        return [
            'first_name.required' => 'First name is required.',
            'first_name.string' => 'First name must be a valid string.',
            'first_name.max' => 'First name cannot be more than 255 characters.',
            'first_name.regex' => 'First name may only contain letters, spaces, and hyphens.',

            'last_name.required' => 'Last name is required.',
            'last_name.string' => 'Last name must be a valid string.',
            'last_name.max' => 'Last name cannot be more than 255 characters.',
            'last_name.regex' => 'Last name may only contain letters, spaces, and hyphens.',

            'organization_id.uuid' => 'Organization ID must be a valid UUID.',

            'email.required' => 'User email address is required.',
            'email.string' => 'User email must be a valid string.',
            'email.email' => 'Please enter a valid user email address.',
            'email.unique' => 'The user is already registered.',

            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a valid string.',
            'password.min' => 'Password must be at least 8 characters long.',
            'password.confirmed' => 'Password confirmation does not match.'
        ];
    }

}

?>