<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class LoginUserData extends Data
{
    public function __construct(
        public readonly string $email,
        public readonly string $password
    ) { }

    public static function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email:rfc,dns'],
            'password' => ['required', 'string', 'min:8']
        ];
    }

    public static function messages(): array
    {
        return [
            'email.required' => 'Email address is required.',
            'email.string' => 'Email must be a valid string.',
            'email.email' => 'Please enter a valid email address.',

            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a valid string.',
            'password.min' => 'Password must be at least 8 characters long.'
        ];
    }
}

?>