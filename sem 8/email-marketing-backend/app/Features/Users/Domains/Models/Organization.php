<?php

namespace App\Features\Users\Domains\Models;

use App\Features\Plans\Domains\Data\SubscriptionData;
use App\Features\Plans\Domains\Models\Subscription;
use App\Features\Users\Domains\Data\CreateSettingsData;
use App\Features\Users\Domains\Data\OrganizationData;
use App\Features\Users\Domains\Data\UpdateOrganizationData;
use App\Features\Users\Domains\Data\UserData;
use App\Features\Users\Domains\Data\UserWithRoleData;
use App\Features\Users\Domains\Enums\OrganizationStatusEnum;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Organization extends BaseModel
{
    /**
     * Casting attributes
     *
     * @return array
     */
    protected function casts(): array
    {
        return [
            'status' => OrganizationStatusEnum::class
        ];
    }

    /**
     * Setting slug with respect to the organization name
     *
     * @param string $name
     * @return void
     */
    protected function setNameAttribute(string $name)
    {
        $this->attributes['name'] = $name;
        $this->attributes['slug'] = Str::slug($name);
    }

    /**
     * Organization has many users
     *
     * @return HasMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Function to create a new user
     *
     * @param UserData|UserWithRoleData $userData
     * @return User
     */
    public function createUser(UserData|UserWithRoleData $userData): User
    {
        return $this->users()->create($userData->toArray())->fresh();
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class);
    }

    public function createSubscription(SubscriptionData $subscriptionData): Subscription
    {
        return $this->subscriptions()->create($subscriptionData->toArray())->fresh();
    }

    public function createSettings(User $user): Settings
    {
        $settings = new Settings();
        $createSettingsData = CreateSettingsData::validateAndCreate([
            'organization_id' => $this->id,
            'sender_name' => $user->first_name . ' ' . $user->last_name,
            'sender_email' => $this->email,
            'organization_details' => $this->address
        ]);
        $settings->createSettings($createSettingsData);
        return $settings;
    }

    /**
     * Creating Organization and associated user
     *
     * @param OrganizationData $organizationData
     * @param UserData $userData
     * @return array
     */
    public function createOrganizationAndUser(OrganizationData $organizationData, UserData $userData): array
    {
        DB::beginTransaction();
        $organization = $this->create($organizationData->toArray());
        $userData->email_verified_at = Carbon::now('Asia/Kolkata');
        $user = $organization->createUser($userData);
        $subscriptionData = SubscriptionData::from([]);
        $subscription = $organization->createSubscription($subscriptionData);
        $organization->createSettings($user);
        DB::commit();
        return [
            'organization' => $organization->fresh(),
            'user' => $user
        ];
    }

    /**
     * Function to update organization data
     *
     * @param UpdateOrganizationData $updateOrganizationData
     * @return boolean
     */
    public function updateOrganization(UpdateOrganizationData $updateOrganizationData): bool
    {
        return $this->update($updateOrganizationData->toArray());
    }

    /**
     * Find organization by id
     *
     * @param string $id
     * @return self|null
     */
    public function findOrganizationById(string $id): ?self
    {
        return self::where('id' ,'=', $id)->first() ?? null;
    }
}
