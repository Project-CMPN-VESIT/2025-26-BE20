<?php

namespace App\Features\Users\Services;

use App\Features\Users\Domains\Data\OrganizationData;
use App\Features\Users\Domains\Data\UpdateOrganizationData;
use App\Features\Users\Domains\Models\Organization;
use App\Support\Helpers\RedisHelper;

class OrganizationService
{
    /**
     * OrganizationService Constructor
     *
     * @param Organization $organization
     */
    public function __construct(
        private Organization $organization
    ) { }

    /**
     * Creating organization along with user
     *
     * @param string $email
     * @return array
     */
    public function createOrganizationAndUser(string $email): array
    {
        $organizationData = self::getStoredOrganizationData($email);
        $userData = AuthService::getStoredUserData($email);
        return $this->organization->createOrganizationAndUser($organizationData, $userData);
    }

    /**
     * Find organization by id
     *
     * @param string $id
     * @return Organization|null
     */
    public function findOrganizationById(string $id): ?Organization
    {
        return $this->organization->findOrganizationById($id);
    }

    /**
     * Updating organization details
     *
     * @param UpdateOrganizationData $updateOrganizationData
     * @param string $id
     * @return Organization|null
     */
    public function updateOrganization(UpdateOrganizationData $updateOrganizationData, string $id): ?Organization
    {
        $this->organization = $this->findOrganizationById($id);

        if(!$this->organization) {
            return null;
        }

        $this->organization->updateOrganization($updateOrganizationData);

        return $this->organization->fresh();
    }

    /**
     * Store organization data temporarily
     *
     * @param OrganizationData $organizationData
     * @param string $email
     * @return void
     */
    public static function storeOrganizationDataTemporarily(OrganizationData $organizationData, string $email): void
    {
        $key = "organization:{$email}";
        RedisHelper::storeDataTemporarily($organizationData->toArray(), $key, 300);
    }

    /**
     * Get temporary stored data
     *
     * @param string $email
     * @return OrganizationData
     */
    public static function getStoredOrganizationData(string $email): OrganizationData
    {
        $key = "organization:{$email}";
        $organization = RedisHelper::getTemporaryData($key);
        return OrganizationData::from($organization);
    }
}

?>