<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class ResetPasswordData extends Data
{
    public function __construct(
        public readonly string $token,
        public readonly string $new_password,
        public readonly string $password_confirmation
    ) { }

    public static function rules(): array
    {
        return [
            'token' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:8'],
            'password_confirmation' => ['required', 'string', 'same:new_password']
        ];
    }
}

?>