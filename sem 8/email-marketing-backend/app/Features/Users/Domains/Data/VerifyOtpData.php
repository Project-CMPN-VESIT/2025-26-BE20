<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class VerifyOtpData extends Data
{
    public function __construct(
        public readonly string $email,
        public readonly string $otp
    ) { }

    public static function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email:rfc,dns'],
            'otp' => ['required', 'min:0000', 'max:9999']
        ];
    }

    public static function messages(): array
    {
        return [
            'email.required' => 'Email address is required.',
            'email.string' => 'Email must be a valid string.',
            'email.email' => 'Please enter a valid email address.',

            'otp.required' => 'Otp is required.',
            'otp.int' => 'Otp must be an integer.',
            'otp.min' => 'Invalid otp.',
            'otp.max' => 'Invalid otp.'
        ];
    }
}

?>