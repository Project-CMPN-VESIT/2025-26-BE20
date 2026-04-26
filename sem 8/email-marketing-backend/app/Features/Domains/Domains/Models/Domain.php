<?php

namespace App\Features\Domains\Domains\Models;

use App\Features\Domains\Domains\Data\CreateDomainData;
use App\Features\Domains\Domains\Data\UpdateDomainData;
use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class Domain extends BaseModel
{
    /**
     * Casts for attributes
     *
     * @var array
     */
    protected $casts = [
        'status' => DomainStatusEnum::class,
        'verification_errors' => 'array',
    ];

    /**
     * Function to create domain
     *
     * @param CreateDomainData $createDomainData
     * @return self
     */
    public function createDomain(CreateDomainData $createDomainData): self
    {
        return $this->create($createDomainData->toArray());
    }

    /**
     * Function to update domain
     *
     * @param UpdateDomainData $updateDomainData
     * @return boolean
     */
    public function updateDomain(UpdateDomainData $updateDomainData): bool
    {
        $updatedDomainDataArr = array_filter($updateDomainData->toArray(), fn($value) => $value !== null && $value !== '');
        return $this->update($updatedDomainDataArr);
    }

    /**
     * Function to delete domain
     *
     * @return boolean
     */
    public function deleteDomain(): bool
    {
        $this->dnsRecords()->delete();
        return $this->delete();
    }

    /**
     * Find a domain by name and organization
     *
     * @param string $name
     * @param string $organization_id
     * @return self|null
     */
    public function findDomainByNameAndOrganization(string $name, string $organization_id): ?self
    {
        return $this->where('organization_id', '=', $organization_id)->where('domain_name', 'LIKE', $name)->first() ?? null;
    }

    /**
     * Get domain by id
     *
     * @param string $id
     * @return self|null
     */
    public function getDomainById(string $id): ?self
    {
        return $this->where('id', '=', $id)->first() ?? null;
    }

    /**
     * Get domains by organization id
     *
     * @param string $organization_id
     * @return Collection
     */
    public function getDomainsByOrganizationId(string $organization_id): Collection
    {
        return $this->where('organization_id', '=', $organization_id)->orderBy('created_at', 'desc')->get();
    }

    /**
     * Get default domain for organization
     *
     * @param string $organization_id
     * @return self|null
     */
    public function getDefaultDomainForOrganization(string $organization_id): ?self
    {
        return Domain::where('organization_id', '=', $organization_id)->where('is_default', '=', true)->first() ?? null;
    }

    /**
     * Get all unresolved domains
     *
     * @return Collection
     */
    public function getAllUnresolvedDomains(): Collection
    {
        return Domain::where('status', '=', DomainStatusEnum::UNRESOLVED)->orderBy('created_at', 'desc')->get();
    }

    public function getMostRecentReplacementsForDefaultDomain(string $excludeId, string $organization_id): Builder
    {
        return Domain::where('id', '!=', $excludeId)->where('organization_id', '==', $organization_id)->orderBy('created_at', 'asc');
    }

    public function dnsRecords()
    {
        return $this->hasMany(DnsRecord::class, 'domain_id', 'id');
    }
}
