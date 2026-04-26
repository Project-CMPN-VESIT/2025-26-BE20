<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class InvitationAndUrlData extends Data
{
    public function __construct(
        public InvitationData $invitation,
        public string $redirect_url
    ) { }
}

?>