<?php

namespace App\Features\Users\Domains\Observers;

use App\Features\Users\Domains\Exceptions\NothingToUpdateException;
use App\Features\Users\Domains\Models\User;

class UserObserver
{
    public function saving(User $user): void
    {
        if($user->isDirty('password')) return;
        if (!$user->isDirty(['first_name', 'last_name', 'profile_image', 'role'])) {
            throw new NothingToUpdateException('No changes detected in the data.');
        }
    }
}
