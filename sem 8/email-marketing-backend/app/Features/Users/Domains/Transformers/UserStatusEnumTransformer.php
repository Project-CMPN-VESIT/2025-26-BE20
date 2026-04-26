<?php

namespace App\Features\Users\Domains\Transformers;

use App\Features\Users\Domains\Enums\UserStatusEnum;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Support\Transformation\TransformationContext;
use Spatie\LaravelData\Transformers\Transformer;

class UserStatusEnumTransformer implements Transformer
{
    public function transform(DataProperty $property, mixed $value, TransformationContext $context): mixed
    {
        return is_string($value)
            ? UserStatusEnum::fromString($value)
            : UserStatusEnum::from($value); // if already an int
    }
}
