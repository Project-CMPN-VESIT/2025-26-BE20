<?php

namespace App\Features\Users\Services;

use App\Features\Users\Domains\Data\CreateSettingsData;
use App\Features\Users\Domains\Data\UpdateSettingsData;
use App\Features\Users\Domains\Exceptions\NothingToUpdateException;
use App\Features\Users\Domains\Models\Settings;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SettingsService
{
    public function getSettingsForOrganization(string $organization_id): ?Settings
    {
        $organization_id = auth('api')->user()->organization_id;
        $settings = new Settings();
        return $settings->getSettingsForOrganization($organization_id);
    }

    public function updateSettings(UpdateSettingsData $updateSettingsData, string $organization_id): ?Settings
    {
        $settings = $this->getSettingsForOrganization($organization_id);

        if(!$settings) {
            throw new NotFoundHttpException('Settings not found for organization');
        }

        $settings->updateSettings($updateSettingsData);

        return $settings;
    }
}

?>