<?php

namespace App\Features\Campaigns\Http\v1\Controllers;

use App\Features\Campaigns\Domains\Data\CampaignEmailTemplateData;
use App\Features\Campaigns\Domains\Data\CreateCampaignData;
use App\Features\Campaigns\Domains\Data\ScheduleCampaignData;
use App\Features\Campaigns\Domains\Data\UpdateCampaignData;
use App\Features\Campaigns\Domains\Enums\CampaignStatusEnum;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\Campaigns\Http\v1\Resources\CampaignResource;
use App\Features\Campaigns\Services\CampaignService;
use App\Handlers\ResponseHandler;
use App\Support\Utils\Util;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CampaignController
{
    /**
     * CampaignController Constructor
     *
     * @param CampaignService $campaignService
     */
    public function __construct(
        private CampaignService $campaignService
    ) { }

    
    /**
     * Function to create a new campaign
     *
     * @param CreateCampaignData $createCampaignData
     * @return JsonResponse
     */
    public function createCampaign(CreateCampaignData $createCampaignData): JsonResponse
    {
        $campaign = $this->campaignService->createCampaign($createCampaignData);
        return ResponseHandler::success(['campaign' => CampaignResource::fromModel($campaign)], 'Campaign created successfully', Response::HTTP_CREATED);
    }

    /**
     * Setting email template for campaign
     *
     * @param CampaignEmailTemplateData $campaignEmailTemplateData
     * @param Campaign $campaign
     * @return JsonResponse
     */
    public function setEmailTemplate(CampaignEmailTemplateData $campaignEmailTemplateData, Campaign $campaign): JsonResponse
    {
        if(in_array($campaign->status, [CampaignStatusEnum::ONGOING, CampaignStatusEnum::COMPLETED])) {
            return ResponseHandler::badRequest('Cannot change email template for an ongoing or completed campaign');
        }
        $this->campaignService->setCampaignEmailTemplate($campaignEmailTemplateData, $campaign);
        return ResponseHandler::success(['campaign' => CampaignResource::fromModel($campaign)], 'Email template set successfully', Response::HTTP_OK);
    }

    /**
     * Scheduling Campaigns
     *
     * @param ScheduleCampaignData $scheduleCampaignData
     * @return JsonResponse
     */
    public function scheduleCampaign(ScheduleCampaignData $scheduleCampaignData, Campaign $campaign): JsonResponse
    {
        if(in_array($campaign->status, [CampaignStatusEnum::ONGOING, CampaignStatusEnum::COMPLETED])) {
            return ResponseHandler::badRequest('Cannot schedule an ongoing or completed campaign');
        }
        $this->campaignService->scheduleCampaign($scheduleCampaignData, $campaign);
        return ResponseHandler::success(['campaign' => CampaignResource::fromModel($campaign)], 'Campaign scheduled successfully', Response::HTTP_OK);
    }

    /**
     * Updating campaigns
     *
     * @param UpdateCampaignData $updateCampaignData
     * @param Campaign $campaign
     * @return JsonResponse
     */
    public function updateCampaign(UpdateCampaignData $updateCampaignData, Campaign $campaign): JsonResponse
    {
        if(in_array($campaign->status, [CampaignStatusEnum::ONGOING, CampaignStatusEnum::COMPLETED])) {
            return ResponseHandler::badRequest('Cannot update an ongoing or completed campaign');
        }
        $this->campaignService->updateCampaign($updateCampaignData, $campaign);
        return ResponseHandler::success(['campaign' => CampaignResource::fromModel($campaign)], 'Campaign updated successfully', Response::HTTP_OK);
    }

    /**
     * Fetching all campaigns
     *
     * @return JsonResponse
     */
    public function getAllCampaigns(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page') ?? 10;
        $campaigns = $this->campaignService->getAllCampaigns();
        $campaignResources = CampaignResource::collect($campaigns);
        $paginatedCampaigns = Util::paginate($campaignResources, $perPage);
        return ResponseHandler::success($paginatedCampaigns, 'All campaigns fetched successfully', Response::HTTP_OK);
    }

    /**
     * Fetching all draft campaigns
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAllDraftCampaigns(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page') ?? 10;
        $campaigns = $this->campaignService->getDraftCampaigns();
        $campaignResources = CampaignResource::collect($campaigns);
        $paginatedCampaigns = Util::paginate($campaignResources, $perPage);
        return ResponseHandler::success($paginatedCampaigns, 'All draft campaigns fetched successfully', Response::HTTP_OK);
    }

    /**
     * Fetching all scheduled campaigns
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAllScheduledCampaigns(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page') ?? 10;
        $campaigns = $this->campaignService->getScheduledCampaigns();
        $campaignResources = CampaignResource::collect($campaigns);
        $paginatedCampaigns = Util::paginate($campaignResources, $perPage);
        return ResponseHandler::success($paginatedCampaigns, 'All scheduled campaigns fetched successfully', Response::HTTP_OK);
    }

    /**
     * Fetching all completed campaigns
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAllCompletedCampaigns(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page') ?? 10;
        $campaigns = $this->campaignService->getCompletedCampaigns();
        $campaignResources = CampaignResource::collect($campaigns);
        $paginatedCampaigns = Util::paginate($campaignResources, $perPage);
        return ResponseHandler::success($paginatedCampaigns, 'All completed campaigns fetched successfully', Response::HTTP_OK);
    }

    /**
     * Fetch a particular campaign
     *
     * @param Campaign $campaign
     * @return JsonResponse
     */
    public function getCampaign(Campaign $campaign): JsonResponse
    {
        return ResponseHandler::success(['campaign' => CampaignResource::fromModel($campaign)], 'Campaign fetched successfully', Response::HTTP_OK);
    }

    /**
     * Delete a campaign
     *
     * @return JsonResponse
     */
    public function deleteCampaign(Campaign $campaign): JsonResponse
    {
        if($campaign->status == CampaignStatusEnum::ONGOING) {
            return ResponseHandler::badRequest('Cannot delete an ongoing campaign');
        }
        $is_deleted = $this->campaignService->deleteCampaign($campaign);
        if(!$is_deleted) {
            return ResponseHandler::error('Could not delete campaign', Response::HTTP_BAD_REQUEST);
        }
        return ResponseHandler::success([], 'Campaign deleted successfullt', Response::HTTP_OK);
    }
}
