<?php

namespace App\Features\Users\Http\v1\Resources;

use App\Features\Users\Domains\Models\Invitation;
use DateTime;
use Spatie\LaravelData\Data;

class InvitationResource extends Data
{
    public function __construct(
        public string $id,
        public string $email,
        public string $role,
        public string $expires_at,
        public bool $is_accepted
    ) { }

    public static function fromModel(Invitation $invitation): self
    {
        return new self(
            id: $invitation->id,
            email: $invitation->email,
            role: $invitation->role->toString(),
            expires_at: $invitation->expires_at,
            is_accepted: $invitation->is_accepted
        );
    }
}

?>