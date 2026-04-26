<?php

use App\Features\Domains\Http\v1\Controllers\DomainController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'role:workspace_admin'])->prefix('domain')->group(function() {
    Route::post('/create-domain', [DomainController::class, 'createDomain']);
    Route::get('/get-all-domains', [DomainController::class, 'getAllDomains']);
    Route::put('/change-default-domain/{domain}', [DomainController::class, 'changeDefaultDomain']);
    Route::put('/verify-domain/{domain}', [DomainController::class, 'verifyDomain']);
    Route::get('/get-dns-records/{domain}', [DomainController::class, 'getDnsRecords']);
    Route::delete('/delete-domain/{domain}', [DomainController::class, 'deleteDomain']);
});

?>