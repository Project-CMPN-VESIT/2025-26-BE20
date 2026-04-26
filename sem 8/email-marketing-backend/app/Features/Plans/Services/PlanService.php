<?php

namespace App\Features\Plans\Services;

use App\Features\Plans\Domains\Models\Plan;
use Illuminate\Database\Eloquent\Collection;

class PlanService
{
    /**
     * PlanService Constructor
     * 
     * @param Plan $plan
     */
    public function __construct(
        protected Plan $plan
    ) { }

    /**
     * Retrieve all available plans
     * 
     * @return Collection<int, Plan>
     */
    public function getAllPlans(): Collection
    {
        return $this->plan->getAllPlans();
    }
}

?>