<?php

namespace App\Features\Campaigns\Http\v1\Controllers;

use App\Features\Campaigns\Services\DashboardService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class DashboardController
{
    public function __construct(
        private DashboardService $dashboardService
    ) { }

    /**
     * Fetches all the monthwise email opened
     *
     * @return JsonResponse
     */
    public function fetchMonthWiseOpensCount(): JsonResponse
    {
        $opensPerMonth = $this->dashboardService->fetchMonthWiseOpensCount();

        return ResponseHandler::success($opensPerMonth, "Fetch monthwise opens count successfully", Response::HTTP_OK);
    }

    /**
     * Fetches monthly subscribers vs unsubscribers
     *
     * @return JsonResponse
     */
    public function fetchSubscribersGraph(): JsonResponse
    {
        $data = $this->dashboardService->fetchSubscribersGraph();

        return ResponseHandler::success($data, "Fetch monthwise subscribers vs unsubscribers", Response::HTTP_OK);
    }

    public function fetchMoreInformationOnSubscribers(): JsonResponse
    {
        $data = $this->dashboardService->fetchMoreInformationOnSubscribers();

        return ResponseHandler::success($data, 'Fetched more information on subscribers successfully', Response::HTTP_OK);
    }

    /**
     * Fetches campaign tracking related data
     *
     * @return JsonResponse
     */
    public function fetchCampaignData(): JsonResponse
    {
        $data = $this->dashboardService->fetchCampaignsInfo();

        return ResponseHandler::success($data, 'Fetched campaign info successfully', Response::HTTP_OK);
    }
}

?>
