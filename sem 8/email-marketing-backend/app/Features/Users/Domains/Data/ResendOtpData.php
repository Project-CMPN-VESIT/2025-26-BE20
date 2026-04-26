<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class ResendOtpData extends Data
{
    public function __construct(
        public string $email
    ) { }

    public static function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email']
        ];
    }
}

?>