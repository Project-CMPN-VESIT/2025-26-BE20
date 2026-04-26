<?php

namespace App\Features\Users\Services;

use App\Features\Users\Domains\Data\InvitationData;
use App\Features\Users\Domains\Data\ResendInvitationData;
use App\Features\Users\Domains\Data\TokenAndUserData;
use App\Features\Users\Domains\Data\UserRoleData;
use App\Features\Users\Domains\Jobs\SendInvitationJob;
use App\Features\Users\Domains\Models\Invitation;
use App\Features\Users\Domains\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\UnauthorizedException;

class InvitationService
{
    /**
     * InvitationService Constructor
     *
     * @param Invitation $invitation
     */
    public function __construct(
        private Invitation $invitation
    ) { }

    /**
     * Creating new invitation
     *
     * @param InvitationData $invitationData
     * @param string $token
     * @return Invitation
     */
    public function createInvitation(InvitationData $invitationData, string $token): Invitation
    {
        $invitationData->setExpiresAt(Carbon::now('Asia/Kolkata')->addHours(48));
        $invitationData->setOrganizationId(auth('api')->user()->organization_id);
        $invitationData->setToken($token);
        return $this->invitation->createInvitation($invitationData);
    }

    /**
     * Sending invitation link
     *
     * @param InvitationData $invitationData
     * @param string $redirect_url
     * @return void
     */
    public function sendInvitationLink(InvitationData $invitationData, string $redirect_url): void
    {
        $url = url($redirect_url . "?token={$invitationData->token}");
        Log::info($url);
        SendInvitationJob::dispatch($invitationData->email, $url);
    }

    /**
     * Accepting Invitation
     *
     * @param TokenAndUserData $tokenAndUserData
     * @return void
     */
    public function acceptInvitation(TokenAndUserData $tokenAndUserData): void
    {
        $token = $tokenAndUserData->token;
        $invitation = $this->invitation->findInvitationFromToken($token);
        if(is_null($invitation)) {
            throw new UnauthorizedException('Invitation link is invalid');
        }
        $this->invitation = $invitation;
        if($this->invitation->expires_at < Carbon::now('Asia/Kolkata')) {
            throw new UnauthorizedException('The link has expired please try again');
        }
        $tokenAndUserData->user->setRole($this->invitation->role);
        $tokenAndUserData->user->setEmail($this->invitation->email);
        AuthService::storeUserDataTemporarily($tokenAndUserData->user, "user:{$tokenAndUserData->user->email}");
    }

    public function isInvitationValid(Invitation $invitation): ?string {
        if($invitation->expires_at < Carbon::now('Asia/Kolkata')) {
            return null;
        }
        return $invitation->email;
    }

    /**
     * Creating new user
     *
     * @param string $email
     * @return User|null
     */
    public function createUser(string $email): ?User
    {
        $this->invitation = $this->findInvitationFromEmail($email);
        if(!$this->invitation) {
            throw new UnauthorizedException('Invitation is not created for this email or invitation is expired');
        }

        $userData = AuthService::getStoredUserData($email);
        $userData->setEmailVerifiedAt(Carbon::now('Asia/Kolkata'));
        $user = $this->invitation->organization->createUser($userData);
        $this->invitation->setIsAcceptedTrue();

        return $user;
    }

    /**
     * Deleting invitation
     *
     * @param string $token
     * @return boolean
     */
    public function deleteInvitation(string $token): bool
    {
        $invitation = $this->invitation->findInvitationFromToken($token);
        if(!$invitation) {
            return false;
        }

        return $invitation->delete();
    }

    /**
     * Find invitation from email
     *
     * @param string $email
     * @return Invitation|null
     */
    public function findInvitationFromEmail(string $email): ?Invitation
    {
        return $this->invitation->findInvitationFromEmail($email);
    }

    /**
     * Find invitation from token
     *
     * @param string $token
     * @return Invitation|null
     */
    public function findInvitationFromToken(string $token): ?Invitation
    {
        return $this->invitation->findInvitationFromToken($token);
    }

    /**
     * Fetching all invitations
     *
     * @return Collection
     */
    public function getAllInvitations(): Collection
    {
        $organization_id = auth('api')->user()->organization_id;
        return $this->invitation->getAllInvitations($organization_id);
    }

    /**
     * Updating user role
     *
     * @param UserRoleData $userRoleData
     * @param Invitation $invitation
     * @return Invitation|null
     */
    public function updateUserRole(UserRoleData $userRoleData, Invitation $invitation): ?Invitation
    {
        $this->invitation = $invitation;
        if($this->invitation->expires_at < Carbon::now('Asia/Kolkata')) return null;
        $this->invitation->updateInvitation($userRoleData);
        return $this->invitation->fresh();
    }

    /**
     * Resending invitation link
     *
     * @param Invitation $invitation
     * @param string $token
     * @return Invitation
     */
    public function resendInvitationLink(Invitation $invitation, string $token): Invitation
    {
        $this->invitation = $invitation;
        $resendInvitationData = ResendInvitationData::from([
            'token' => $token,
            'expires_at' => Carbon::now('Asia/Kolkata')->addHours(48)
        ]);
        $this->invitation->updateInvitation($resendInvitationData);
        return $this->invitation->fresh();
    }
}

?>