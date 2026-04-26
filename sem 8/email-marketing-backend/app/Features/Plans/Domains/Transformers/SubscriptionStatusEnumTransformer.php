<?php

namespace App\Features\Plans\Domains\Transformers;

use App\Features\Plans\Domains\Enums\SubscriptionStatusEnum;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Support\Transformation\TransformationContext;
use Spatie\LaravelData\Transformers\Transformer;

class SubscriptionStatusEnumTransformer implements Transformer
{
    public function transform(DataProperty $property, mixed $value, TransformationContext $context): mixed
    {
        return is_string($value)
            ? SubscriptionStatusEnum::fromString($value)
            : SubscriptionStatusEnum::from($value); // if already an int
    }
}

?>