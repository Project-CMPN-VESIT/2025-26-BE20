<?php

namespace App\Features\Domains\Http\v1\Resources;

use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use Spatie\LaravelData\Data;

class DomainResource extends Data
{
    /**
     * DomainResource Constructor
     *
     * @param string $id
     * @param string $domain_name
     * @param string $status
     * @param boolean $is_default
     */
    public function __construct(
        public string $id,
        public string $domain_name,
        public string $status,
        public bool $is_default,
        public ?array $verification_errors,
    ) { }

    /**
     * Creating DomainResource object from Model
     *
     * @param [type] $domain
     * @return self
     */
    public static function fromModel($domain): self
    {
        return new self (
            id: $domain->id,
            domain_name: $domain->domain_name,
            status: $domain->status instanceof DomainStatusEnum
                    ? $domain->status->toString()
                    : DomainStatusEnum::from($domain->status)->toString(),
            is_default: $domain->is_default,
            verification_errors: $domain->verification_errors,
        );
    }
}

?>