<?php

namespace App\Features\Users\Http\v1\Controllers;

use App\Features\Users\Domains\Data\UpdateSettingsData;
use App\Features\Users\Http\v1\Resources\SettingsResource;
use App\Features\Users\Services\SettingsService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;

class SettingsController
{
    public function __construct(
        private SettingsService $settingsService
    ) { }

    public function getSettingsForOrganization(): JsonResponse
    {
        $organization_id = auth('api')->user()->organization_id;
        $settings = $this->settingsService->getSettingsForOrganization($organization_id);
        return ResponseHandler::success(['settings' => SettingsResource::from($settings)], 'Setting fetched successfully', 200);
    }

    public function updateSettings(UpdateSettingsData $data): JsonResponse
    {
        $organization_id = auth('api')->user()->organization_id;
        if(isset($data->default_logo_image)) {
            $file = $data->default_logo_image;
            $filePath = $file->store('logos', config('filesystems.default'));
            $data->default_logo = $filePath;
            unset($data->default_logo_image);
        } else {
            $originalSettings = $this->settingsService->getSettingsForOrganization($organization_id);
            $data->default_logo = $originalSettings->default_logo;
        }
        $settings = $this->settingsService->updateSettings($data, $organization_id);
        return ResponseHandler::success(['settings' => SettingsResource::from($settings)], 'Account settings updated successfully', 200);
    }
}

?>