<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class CreateSettingsData extends Data
{
    public function __construct(
        public string $organization_id,
        public string $sender_name,
        public string $sender_email,
        public string $organization_details
    ) { }
}

?>