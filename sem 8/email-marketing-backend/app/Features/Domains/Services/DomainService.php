<?php

namespace App\Features\Domains\Services;

use App\Features\Domains\Domains\Data\CreateDomainData;
use App\Features\Domains\Domains\Data\UpdateDomainData;
use App\Features\Domains\Domains\Jobs\VerifyDomainJob;
use App\Features\Domains\Domains\Models\Domain;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class DomainService 
{
    private string $organization_id;
    
    /**
     * DomainService Constructor
     *
     * @param Domain $domain
     */
    public function __construct(
        private Domain $domain, private DnsRecordService $dnsRecordService
    ) { 
        $this->organization_id = auth('api')->user()->organization_id;
    }

    /**
     * Function to create domain
     *
     * @param CreateDomainData $createDomainData
     * @return Domain
     */
    public function createDomain(CreateDomainData $createDomainData): Domain
    {
        if(!$createDomainData->is_default) {
            $createDomainData->is_default = false;
            if(!count($this->getDomainsByOrganizationId())) {
                $createDomainData->is_default = true;
            } 
        } else if($createDomainData->is_default) {
            $defaultDomain = $this->getDefaultDomainForOrganization();
            if($defaultDomain) {
                $this->updateDomain(
                    UpdateDomainData::validateAndCreate([
                        'is_default' => false
                    ]),
                    $defaultDomain->id
                );
            }
        }
        DB::beginTransaction();
        $domainObj = $this->domain->createDomain($createDomainData);
        $this->dnsRecordService->createDnsRecordsForDomain($domainObj);
        DB::commit();
        return $domainObj;
    }

    /**
     * Finding domain by name and organization
     *
     * @param string $name
     * @return Domain|null
     */
    public function findDomainByNameAndOrganization(string $name): ?Domain
    {
        return $this->domain->findDomainByNameAndOrganization($name, $this->organization_id);
    }

    /**
     * Get domain by id
     *
     * @param string $id
     * @return Domain|null
     */
    public function getDomainById(string $id): ?Domain
    {
        return $this->domain->getDomainById($id);
    }

    /**
     * Fetching all domains by organization id
     *
     * @return Collection
     */
    public function getDomainsByOrganizationId(): Collection
    {
        return $this->domain->getDomainsByOrganizationId($this->organization_id);
    }

    /**
     * Fetching default domain for a organization
     *
     * @return Domain|null
     */
    public function getDefaultDomainForOrganization(): ?Domain
    {
        return $this->domain->getDefaultDomainForOrganization($this->organization_id);
    }

    /**
     * Fetching all unresolved domains
     *
     * @return Collection
     */
    public function getAllUnresolvedDomains(): Collection
    {
        return $this->domain->getAllUnresolvedDomains();
    }

    /**
     * Updating domain
     *
     * @param UpdateDomainData $updateDomainData
     * @param string $id
     * @return Domain|null
     */
    public function updateDomain(UpdateDomainData $updateDomainData, string $id): ?Domain
    {
        $this->domain = $this->getDomainById($id);

        if(!$this->domain) {
            return null;
        }

        $this->domain->updateDomain($updateDomainData);
        return $this->domain->fresh();
    }

    /**
     * Changing default domain
     *
     * @param UpdateDomainData $updateDomainData
     * @param Domain $domain
     * @return Domain|null
     */
    public function changeDefaultDomain(UpdateDomainData $updateDomainData, Domain $domain): ?Domain
    {
        $this->domain = $domain;

        $organization_id = auth('api')->user()->organization_id;
        $defaultDomain = $this->getDefaultDomainForOrganization($organization_id);
            if($defaultDomain) {
                $defaultDomain->updateDomain(
                    UpdateDomainData::validateAndCreate([
                        'is_default' => false
                    ]),
                    $defaultDomain->id
                );
            }

        unset($updateDomainData->status);
        $this->domain->updateDomain($updateDomainData);
        return $this->domain;
    }

    /**
     * Verifying / Resolving domain
     *
     * @param Domain $domain
     * @return Domain|null
     */
    public function verifyDomain(Domain $domain): ?Domain
    {
        $this->domain = $domain;
        $job = new VerifyDomainJob($this->domain);
        $job->handle();
        return $this->domain->fresh();
    }

    /**
     * Deleting domain
     *
     * @param Domain $domain
     * @return boolean
     */
    public function deleteDomain(Domain $domain): bool
    {
        $this->domain = $domain;
        $organization_id = auth('api')->user()->organization_id;
        
        if($this->domain->organization_id !== $organization_id) {
            throw new AuthorizationException('Cannot delete domain that is not owned by the user');
        }

        if($this->domain->is_default == true) {
            $newDefaultDomain = $this->domain->getMostRecentReplacementsForDefaultDomain($domain->id, $this->organization_id)->lockForUpdate()->first();
            if(!is_null($newDefaultDomain)) {
                $dto = new UpdateDomainData(
                    status: null,
                    is_default: true
                );
                $this->changeDefaultDomain($dto, $newDefaultDomain);
                $this->domain = $domain;
            }
        }
        
        return $this->domain->deleteDomain();
    }
}

?>