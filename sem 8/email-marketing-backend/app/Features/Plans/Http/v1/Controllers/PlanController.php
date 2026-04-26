<?php

namespace App\Features\Plans\Http\v1\Controllers;

use App\Features\Plans\Http\v1\Resources\PlanResource;
use App\Features\Plans\Services\PlanService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;

class PlanController
{
    public function __construct(
        protected PlanService $planService
    ) { }

    /**
     * Get a list of all active plans
     * 
     * @return JsonResponse
     */
    public function getAllPlans(): JsonResponse
    {
        $plans = $this->planService->getAllPlans();
        return ResponseHandler::success(['plans' => PlanResource::collect($plans)], "All plans fetched successfully.", 200);
    }
}
