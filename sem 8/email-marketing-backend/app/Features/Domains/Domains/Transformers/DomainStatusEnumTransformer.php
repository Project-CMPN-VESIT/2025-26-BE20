<?php

namespace App\Features\Domains\Domains\Transformers;

use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Support\Transformation\TransformationContext;
use Spatie\LaravelData\Transformers\Transformer;

class DomainStatusEnumTransformer implements Transformer
{
    /**
     * Transforms data type to DomainStatusEnum
     *
     * @param DataProperty $property
     * @param mixed $value
     * @param TransformationContext $context
     * @return DomainStatusEnum
     */
    public function transform(DataProperty $property, mixed $value, TransformationContext $context): DomainStatusEnum
    {
        if ($value instanceof DomainStatusEnum) {
            return $value;
        }

        return DomainStatusEnum::from((int) $value);
    }
}

?>