<?php

namespace App\Features\Users\Domains\Data;

use Illuminate\Support\Carbon;
use Spatie\LaravelData\Data;

class ResendInvitationData extends Data
{
    public function __construct(
        public string $token,
        public Carbon $expires_at
    ) { }
}

?>