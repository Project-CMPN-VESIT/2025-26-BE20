<?php

namespace App\Features\Users\Domains\Models;

use App\Features\Users\Domains\Data\InvitationData;
use App\Features\Users\Domains\Data\ResendInvitationData;
use App\Features\Users\Domains\Data\UserRoleData;
use App\Features\Users\Domains\Data\UserWithRoleData;
use App\Features\Users\Domains\Enums\UserRoleEnum;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Invitation extends BaseModel
{
    /**
     * Casts
     *
     * @return array
     */
    protected function casts(): array
    {
        return [
            'role' => UserRoleEnum::class
        ];
    }

    /**
     * Setting relation with Organization
     *
     * @return BelongsTo
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Function to create invitation
     *
     * @param InvitationData $invitationData
     * @return self
     */
    public function createInvitation(InvitationData $invitationData): self
    {
        return $this->create($invitationData->toArray())->fresh();
    }

    /**
     * Function to create user
     *
     * @param UserWithRoleData $userWithRoleData
     * @return User|null
     */
    public function createUser(UserWithRoleData $userWithRoleData): ?User
    {
        $userWithRoleData->email_verified_at = Carbon::now('Asia/Kolkata');
        return $this->organization->createUser($userWithRoleData);
    }

    /**
     * Function to update invitation
     *
     * @param UserRoleData|ResendInvitationData $data
     * @return boolean
     */
    public function updateInvitation(UserRoleData|ResendInvitationData $data): bool
    {
        return $this->update($data->toArray());
    }

    /**
     * Function to get invitation from email
     *
     * @param string $email
     * @return self|null
     */
    public function findInvitationFromEmail(string $email): ?self
    {
        return $this->with('organization')->where('email', '=', $email)->first() ?? null;
    }

    /**
     * Function to get invitation from token
     *
     * @param string $token
     * @return self|null
     */
    public function findInvitationFromToken(string $token): ?self
    {
        return $this->with('organization')->where('token', '=', $token)->first() ?? null;
    }

    /**
     * Function to fetch all invitations
     *
     * @param string $organization_id
     * @return Collection
     */
    public function getAllInvitations(string $organization_id): Collection
    {
        return $this->where('organization_id', '=', $organization_id)->get();
    }

    /**
     * Function to set is_accepted true
     *
     * @return boolean
     */
    public function setIsAcceptedTrue(): bool
    {
        return $this->update(['is_accepted' => true]);
    }
}
