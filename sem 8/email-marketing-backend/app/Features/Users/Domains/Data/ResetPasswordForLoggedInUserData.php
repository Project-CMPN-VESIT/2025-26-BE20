<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class ResetPasswordForLoggedInUserData extends Data
{
    public function __construct(
        public readonly string $old_password,
        public readonly string $new_password,
        public readonly string $password_confirmation
    ) { }

    public static function rules(): array
    {
        return [
            'old_password' => ['required', 'string', 'min:8', 'different:new_password'],
            'new_password' => ['required', 'string', 'min:8'],
            'password_confirmation' => ['required', 'string', 'same:new_password']
        ];
    }
}

?>