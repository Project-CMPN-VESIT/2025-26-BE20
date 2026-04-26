<?php

namespace App\Features\Plans\Services;

use App\Features\Plans\Domains\Data\SubscriptionData;
use App\Features\Plans\Domains\Models\Subscription;

class SubscriptionService
{
    /**
     * SubscriptionService Constructor
     *
     * @param Subscription $subscription
     */
    public function __construct(
        protected Subscription $subscription
    ) { }

    /**
     * Create subscription
     *
     * @param SubscriptionData $subscriptionData
     * @return Subscription
     */
    public function createSubscription(SubscriptionData $subscriptionData): Subscription
    {
        return $this->subscription->createSubscription($subscriptionData);
    }
}

?>