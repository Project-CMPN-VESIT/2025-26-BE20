<?php

namespace App\Features\Plans\Http\v1\Resources;

use App\Features\Plans\Domains\Enums\PlanBillingEnum;
use Spatie\LaravelData\Data;

class PlanResource extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $billing_type,
        public int $price,
        public string $currency,
        public int|string $email_limit,
        public int $subscriber_limit,
        public array $features,
    ) {}

    public static function fromModel($plan): self
    {
        return new self(
            id: $plan->id,
            name: $plan->name,
            billing_type: PlanBillingEnum::from($plan->billing)->toString(),
            price: $plan->price,
            currency: $plan->currency,
            email_limit: $plan->email_limit == -1 ? "Unlimited" : $plan->email_limit,
            subscriber_limit: $plan->subscriber_limit,
            features: $plan->features,
        );
    }
}

?>