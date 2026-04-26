<?php

namespace App\Features\Plans\Domains\Models;

use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Collection;

class Plan extends BaseModel
{
    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
    ];

    /**
     * Retrieving all active plans from database
     * 
     * @return Collection<int, self>
     */
    public function getAllPlans(): Collection
    {
        return Plan::where('is_active', '=', true)->get();
    }
}
