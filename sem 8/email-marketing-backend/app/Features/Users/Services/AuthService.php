<?php

namespace App\Features\Users\Services;

use App\Features\Users\Domains\Data\ResetPasswordData;
use App\Features\Users\Domains\Data\ResetPasswordForLoggedInUserData;
use App\Features\Users\Domains\Data\UpdateUserData;
use App\Features\Users\Domains\Models\User;
use App\Features\Users\Domains\Data\UserData;
use App\Features\Users\Domains\Data\UserRoleAndEmailData;
use App\Features\Users\Domains\Data\UserWithRoleData;
use App\Support\Helpers\RedisHelper;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\UnauthorizedException;

class AuthService
{
    /**
     * AuthService Constructor
     *
     * @param User $user
     */
    public function __construct(
        private User $user
    ) { }

    /**
     * Creating new user
     *
     * @param UserData $userData
     * @return User
     */
    public function createUser(UserData $userData): User
    {
        return $this->user->createUser($userData)->fresh();
    }

    /**
     * Find user by id
     *
     * @param string $id
     * @return User|null
     */
    public function findUserById(string $id): ?User
    {
        return $this->user->findUserById($id);
    }

    /**
     * Find user by email
     *
     * @param string $email
     * @return User|null
     */
    public function findUserByEmail(string $email): ?User
    {
        return $this->user->findUserByEmail($email);
    }

    /**
     * Verify password from db hash
     *
     * @param string $db_password
     * @param string $request_password
     * @return boolean
     */
    public function verifyPassword(string $db_password, string $request_password): bool
    {
        return password_verify($request_password, $db_password);
    }

    /**
     * Updating user details
     *
     * @param UpdateUserData $updateUserData
     * @return User|null
     */
    public function updateUser(UpdateUserData $updateUserData): ?User
    {
        $this->user = auth('api')->user();

        if(!$this->user) return null;

        if(!is_null($updateUserData->profile_image)) {
            $file = $updateUserData->profile_image;
            $filePath = $file->store('profile', config('filesystems.default'));
            $updateUserData->setProfileImage($filePath);
        }

        $this->user->updateUser($updateUserData);

        return $this->user->fresh();
    }

    /**
     * Updating password for logged out user
     *
     * @param ResetPasswordData $resetPasswordData
     * @param string $email
     * @return User|null
     */
    public function updatePasswordForLoggedOutUser(ResetPasswordData $resetPasswordData, string $email): ?User
    {
        $this->user = $this->findUserByEmail($email);
        
        if(!$this->user) return null;

        $this->user->updatePassword($resetPasswordData->new_password);

        return $this->user;
    }

    /**
     * Update password for logged in user
     *
     * @param ResetPasswordForLoggedInUserData $resetPasswordForLoggedInUserData
     * @return User|null
     */
    public function updatePasswordForLoggedInUser(ResetPasswordForLoggedInUserData $resetPasswordForLoggedInUserData): ?User
    {
        $this->user = auth('api')->user();
        if(!password_verify($resetPasswordForLoggedInUserData->old_password, $this->user->password)) {
            throw new UnauthorizedException('The current password is incorrect');
        }

        $this->user->updatePassword($resetPasswordForLoggedInUserData->new_password);

        return $this->user;
    }

    /**
     * Fetching all users
     *
     * @return Collection
     */
    public function getAllUsers(): Collection
    {
        $userId = auth('api')->user()->id;
        $organizationId = auth('api')->user()->organization_id;

        return $this->user->getAllUsers($organizationId, $userId);
    }

    /**
     * Storing user data temporarily
     *
     * @param UserData|UserWithRoleData $userData
     * @return void
     */
    public static function storeUserDataTemporarily(UserData|UserWithRoleData $userData): void
    {
        $key = "user:{$userData->email}";
        RedisHelper::storeDataTemporarily($userData->toArray(), $key);
    }

    /**
     * Fetching temporary stored data
     *
     * @param string $email
     * @return UserData|UserWithRoleData
     */
    public static function getStoredUserData(string $email): UserData|UserWithRoleData
    {
        $key = "user:{$email}";
        $user = RedisHelper::getTemporaryData($key);
        $userData = array_key_exists('role', $user) ? UserWithRoleData::from($user) : UserData::from($user);

        return $userData;
    }

    /**
     * Updating user role
     *
     * @param UserRoleAndEmailData $userRoleAndEmailData
     * @return User|null
     */
    public function updateUserRole(UserRoleAndEmailData $userRoleAndEmailData): ?User
    {
        $this->user = $this->findUserByEmail($userRoleAndEmailData->email);
        $this->user->updateUser($userRoleAndEmailData);
        return $this->user;
    }
}

?>