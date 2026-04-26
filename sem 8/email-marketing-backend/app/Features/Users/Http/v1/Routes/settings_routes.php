<?php

use App\Features\Users\Http\v1\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::prefix('settings')->middleware(['auth:api', 'role:workspace_admin'])->group(function() {
    Route::get('/get-account-settings', [SettingsController::class, 'getSettingsForOrganization']);
    Route::post('/update-settings', [SettingsController::class, 'updateSettings']);
});

?>