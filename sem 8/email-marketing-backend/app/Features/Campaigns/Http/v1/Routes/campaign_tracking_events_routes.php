<?php

use App\Features\Campaigns\Http\v1\Controllers\CampaignTrackingEventController;
use Illuminate\Support\Facades\Route;

Route::prefix('tracking')->group(function() {
    Route::get('/open/{campaign}/{contact}', [CampaignTrackingEventController::class, 'trackOpens'])->name('email.trackOpen');
    Route::get('/click/{campaign}/{contact}', [CampaignTrackingEventController::class, 'trackClicks'])->name('email.trackClick');
    Route::get('/unsubcribe/{campaign}/{contact}', [CampaignTrackingEventController::class, 'trackUnsubscribes'])->name('email.trackUnsubcribe');
    Route::get('/spam/{campaign}/{contact}', [CampaignTrackingEventController::class, 'trackSpams'])->name('email.trackSpam');
});

?>