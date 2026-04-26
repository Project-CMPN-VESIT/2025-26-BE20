<?php

namespace App\Features\Users\Domains\Transformers;

use App\Features\Users\Domains\Enums\UserRoleEnum;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Support\Transformation\TransformationContext;
use Spatie\LaravelData\Transformers\Transformer;

class UserRoleEnumTransformer implements Transformer
{
    public function transform(DataProperty $property, mixed $value, TransformationContext $context): mixed
    {
        if($value instanceof UserRoleEnum) return $value;
        return is_string($value)
            ? UserRoleEnum::fromString($value)
            : UserRoleEnum::from($value); // if already an int
    }
}
