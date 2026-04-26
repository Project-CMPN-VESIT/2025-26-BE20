<?php

namespace App\Features\Users\Http\v1\Resources;

use App\Features\Users\Domains\Models\Organization;
use Spatie\LaravelData\Data;

class OrganizationResource extends Data
{
    /**
     * OrganizationResource Constructor
     *
     * @param string $name
     * @param string $email
     * @param integer $phone_number
     * @param string $address
     * @param string $city
     * @param string $state
     * @param integer $zip
     * @param string $country
     * @param string $status
     */
    public function __construct(
        public string $name,
        public string $email,
        public int $phone_number,
        public string $address,
        public string $city,
        public string $state,
        public int $zip,
        public string $country,
        public string $status
    ) { }

    /**
     * Creating resource from Organization model
     *
     * @param Organization $organization
     * @return self
     */
    public static function fromModel(Organization $organization): self
    {
        return new self(
            name: $organization->name,
            email: $organization->email,
            phone_number: $organization->phone_number,
            address: $organization->address,
            city: $organization->city,
            state: $organization->state,
            zip: $organization->zip,
            country: $organization->country,
            status: $organization->status->toString()
        );
    }
}

?>