<?php

namespace App\Features\Domains\Domains\Data;

use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use App\Features\Domains\Domains\Transformers\DomainStatusEnumTransformer;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class CreateDomainData extends Data
{
    /**
     * CreateDomainData constructor
     *
     * @param string $example_email
     * @param string|null $domain_name
     * @param string|null $organization_id
     * @param DomainStatusEnum|null $status
     * @param string|null $verification_token
     * @param boolean|null $is_default
     */
    public function __construct(
        public string $example_email,
        public ?string $domain_name,
        public ?string $organization_id,
        #[WithTransformer(DomainStatusEnumTransformer::class)]
        public ?DomainStatusEnum $status,
        public ?string $verification_token,
        public ?bool $is_default
    ) { 
        $this->organization_id = auth('api')->user()->organization_id;
        $this->status = DomainStatusEnum::UNRESOLVED;
        $this->domain_name = substr(strrchr($this->example_email, "@"), 1);
    }

    /**
     * Validation rules
     *
     * @return array
     */
    public static function rules(): array
    {
        return [
            'example_email' => ['required', 'string', 'email'],
            'domain_name' => ['nullable', 'string'],
            'organization_id' => ['nullable', 'uuid'],
            'status' => ['nullable', Rule::in(['resolved', 'unresolved'])],
            'verification_token' => ['nullable', 'string'],
            'is_default' => ['nullable', 'boolean']
        ];
    }

    /**
     * Returning array of the data object except example_email
     *
     * @return array
     */
    public function toArray(): array
    {
        $arr = parent::toArray();

        unset($arr['example_email']);
        return $arr;
    }
}

?>