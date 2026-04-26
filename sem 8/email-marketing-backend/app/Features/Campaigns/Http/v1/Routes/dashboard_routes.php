<?php

use App\Features\Campaigns\Http\v1\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'role:workspace_admin'])->group(function() {
    Route::get('fetch-monthwise-opens-count', [DashboardController::class, 'fetchMonthWiseOpensCount']);
    Route::get('/fetch-more-information-on-subscribers', [DashboardController::class, 'fetchMoreInformationOnSubscribers']);
    Route::get('fetch-monthwise-subscribers-vs-unsubscribers', [DashboardController::class, 'fetchSubscribersGraph']);
    Route::get('fetch-campaigns-info', [DashboardController::class, 'fetchCampaignData']);
});

?>