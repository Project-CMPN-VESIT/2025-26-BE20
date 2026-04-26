<?php

use App\Features\Campaigns\Http\v1\Controllers\CampaignController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'role:workspace_admin'])->prefix('campaign')->group(function() {
    Route::post('/create-campaign', [CampaignController::class, 'createCampaign']);
    Route::post('/set-email-template-for-campaign/{campaign}', [CampaignController::class, 'setEmailTemplate']);
    Route::post('/schedule-campaign/{campaign}', [CampaignController::class, 'scheduleCampaign']);
    Route::get('/get-all-campaigns', [CampaignController::class, 'getAllCampaigns']);
    Route::get('/get-all-draft-campaigns', [CampaignController::class, 'getAllDraftCampaigns']);
    Route::get('/get-all-scheduled-campaigns', [CampaignController::class, 'getAllScheduledCampaigns']);
    Route::get('/get-all-completed-campaigns', [CampaignController::class, 'getAllCompletedCampaigns']);
    Route::get('/get-campaign/{campaign}', [CampaignController::class, 'getCampaign']);
    Route::put('/update-campaign/{campaign}', [CampaignController::class, 'updateCampaign']);
    Route::delete('/delete-campaign/{campaign}', [CampaignController::class, 'deleteCampaign']);
});

?>