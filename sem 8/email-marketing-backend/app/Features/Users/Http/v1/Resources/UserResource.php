<?php

namespace App\Features\Users\Http\v1\Resources;

use App\Features\Users\Domains\Models\User;
use Illuminate\Support\Facades\Storage;
use Spatie\LaravelData\Data;

class UserResource extends Data
{
    /**
     * UserResource Constructor
     *
     * @param string $first_name
     * @param string $last_name
     * @param string $email
     * @param string $status
     * @param string $profile_image
     */
    public function __construct(
        public string $first_name,
        public string $last_name,
        public string $email,
        public string $status,
        public string $role,
        public ?string $profile_image
    ) { }

    /**
     * Creating resource from User model
     *
     * @param User $user
     * @return self
     */
    public static function fromModel(User $user): self
    {
        return new self(
            first_name: $user->first_name,
            last_name: $user->last_name,
            email: $user->email,
            status: $user->status->toString(),
            role: $user->role->toString(),
            profile_image: $user->profile_image ? Storage::url($user->profile_image) : null
        );
    }
}

?>