<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class ForgotPasswordData extends Data
{
    public function __construct(
        public readonly string $email,
        public readonly string $redirect_url
    ) { }

    public static function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email:rfc,dns'],
            'redirect_url' => ['required', 'string', 'max:255']
        ];
    }
}

?>