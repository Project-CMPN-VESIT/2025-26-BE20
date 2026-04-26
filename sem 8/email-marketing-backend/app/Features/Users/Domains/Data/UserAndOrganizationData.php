<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class UserAndOrganizationData extends Data
{
    public function __construct(
        public UserData $user,
        public OrganizationData $organization
    ) { }

    public static function messages(): array
    {
        return [
            'user.required' => 'User details are required.',
            'organization.required' => 'Organization details are required.'
        ];
    }
}

?>