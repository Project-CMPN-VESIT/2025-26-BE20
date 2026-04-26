<?php

namespace App\Features\Plans\Domains\Models;

use App\Features\Plans\Domains\Data\SubscriptionData;
use App\Features\Plans\Domains\Enums\SubscriptionStatusEnum;
use App\Features\Users\Domains\Models\Organization;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends BaseModel
{
    protected $casts = [
        'status' => SubscriptionStatusEnum::class,
        'start_date' => 'date',
        'end_date' => 'date',
        'trial_ends_at' => 'date',
    ];

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * Creates a new subscription
     *
     * @param SubscriptionData $subscriptionData
     * @return Subscription
     */
    public function createSubscription(SubscriptionData $subscriptionData): Subscription
    {
        return Subscription::create($subscriptionData->toArray());
    }
}
