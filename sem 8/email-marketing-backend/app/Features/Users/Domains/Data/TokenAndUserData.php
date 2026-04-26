<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class TokenAndUserData extends Data
{
    public function __construct(
        public string $token,
        public UserWithRoleData $user
    ) { }
}

?>