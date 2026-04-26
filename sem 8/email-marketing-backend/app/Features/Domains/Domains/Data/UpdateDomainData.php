<?php

namespace App\Features\Domains\Domains\Data;

use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use App\Features\Domains\Domains\Transformers\DomainStatusEnumTransformer;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class UpdateDomainData extends Data
{
    /**
     * UpdateDomainData Constructor
     *
     * @param DomainStatusEnum|null $status
     * @param boolean|null $is_default
     */
    public function __construct(
        #[WithTransformer(DomainStatusEnumTransformer::class)]
        public ?DomainStatusEnum $status,
        public ?bool $is_default
    ) { }

    /**
     * Validation rules
     *
     * @return array
     */
    public static function rules(): array
    {
        return [
            'status' => ['nullable', Rule::in(['resolved', 'unresolved'])],
            'is_default' => ['sometimes', 'boolean']
        ];
    }
}

?>