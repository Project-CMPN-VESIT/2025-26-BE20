<?php

namespace App\Features\Domains\Http\v1\Controllers;

use App\Features\Domains\Domains\Data\CreateDomainData;
use App\Features\Domains\Domains\Data\UpdateDomainData;
use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use App\Features\Domains\Domains\Models\Domain;
use App\Features\Domains\Http\v1\Resources\DnsRecordResource;
use App\Features\Domains\Http\v1\Resources\DomainResource;
use App\Features\Domains\Services\DnsRecordService;
use App\Features\Domains\Services\DomainService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class DomainController
{
    /**
     * DomainController Constructor
     *
     * @param DomainService $domainService
     */
    public function __construct(
        protected DomainService $domainService,
        protected DnsRecordService $dnsRecordService
    ) { }

    /**
     * Function to create domain
     *
     * @param CreateDomainData $createDomainData
     * @return JsonResponse
     */
    public function createDomain(CreateDomainData $createDomainData): JsonResponse
    {
        if($this->domainService->findDomainByNameAndOrganization($createDomainData->domain_name)) {
            return ResponseHandler::unprocessable_content('Domain already exists');
        }
        
        $domain = $this->domainService->createDomain($createDomainData);
        return ResponseHandler::created(['domain' => DomainResource::fromModel($domain)->toArray()], 'Domain created successfully');
    }

    /**
     * Fetching all domains
     *
     * @return JsonResponse
     */
    public function getAllDomains(): JsonResponse
    {
        $domains = $this->domainService->getDomainsByOrganizationId();

        return ResponseHandler::success(['domains' => DomainResource::collect($domains)], 'All domains fetched successfully', Response::HTTP_OK);
    }

    /**
     * Changing default domain
     *
     * @param UpdateDomainData $updateDomainData
     * @param Domain $domain
     * @return JsonResponse
     */
    public function changeDefaultDomain(UpdateDomainData $updateDomainData, Domain $domain): JsonResponse
    {
        if(isset($updateDomainData->is_default)) {
            
            $domain = $this->domainService->changeDefaultDomain($updateDomainData, $domain);
            return ResponseHandler::success(['domain' => DomainResource::fromModel($domain)], 'Domain set default successfully', 200);
        }
        return ResponseHandler::badRequest('Default field is required');
    }

    /**
     * Verifying / Resolving domain
     *
     * @param Domain $domain
     * @return JsonResponse
     */
    public function verifyDomain(Domain $domain): JsonResponse
    {
        $domain = $this->domainService->verifyDomain($domain);
        if($domain->status === DomainStatusEnum::RESOLVED) {
            return ResponseHandler::success(['domain' => DomainResource::fromModel($domain)], 'Domain verified successfully', Response::HTTP_OK);
        }

        return ResponseHandler::error($domain->verification_errors, 'Could not resolve domain', Response::HTTP_BAD_REQUEST);
    }

    /**
     * Fetching server records
     *
     * @return JsonResponse
     */
    public function getDnsRecords(Domain $domain): JsonResponse
    {
        $dnsRecordsCollection = $this->dnsRecordService->getDnsRecordsByDomain($domain);
        return ResponseHandler::success(['records' => DnsRecordResource::collect($dnsRecordsCollection)], 'Records fetched successfully', Response::HTTP_OK);
    }

    /**
     * Deleting a specific domain
     *
     * @param Domain $domain
     * @return JsonResponse
     */
    public function deleteDomain(Domain $domain): JsonResponse
    {
        $isDeleted = $this->domainService->deleteDomain($domain);
        if(!$isDeleted) {
            return ResponseHandler::not_found("Some issue while deleting domain");
        }
        return ResponseHandler::success(null, 'Domain deleted successfully', Response::HTTP_OK);
    }
}
