<?php

use App\Features\Users\Http\v1\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function() {
    Route::post('/signup', [AuthController::class, 'signUp']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
    Route::post('/verify-otp-for-login', [AuthController::class, 'verifyOtpWhenLogin']);
    Route::post('/forgot-password',[AuthController::class, 'forgotPassword']);
    Route::put('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
});

Route::middleware('auth:api')->prefix('auth')->group(function() {
    Route::post('/update-user', [AuthController::class, 'updateUser']);
    Route::put('/update-organization', [AuthController::class, 'updateOrganization']);
    Route::put('/reset-password-for-logged-in-user', [AuthController::class, 'resetPasswordWithLoggedInUser']);
    Route::get('/get-user-details', [AuthController::class, 'getUserDetails']);
});

Route::middleware(['auth:api', 'role:workspace_admin'])->prefix('auth')->group(function() {
    Route::put('/update-organization', [AuthController::class, 'updateOrganization']);
    Route::get('/get-all-users', [AuthController::class, 'getAllUsers']);
    Route::put('/update-user-role', [AuthController::class, 'updateUserRole']);
});

Route::middleware(['auth:api'])->prefix('auth')->group(function() {
    Route::get('/get-organization-details', [AuthController::class, 'getOrganizationDetails']);
});    

Route::prefix('invitation')->middleware(['auth:api', 'role:workspace_admin'])->group(function() {
    Route::post('/create-invitation', [AuthController::class, 'createInvitation']);
    Route::get('/get-all-invitations', [AuthController::class, 'getAllInvitations']);
    Route::put('/update-user-role/{invitation}', [AuthController::class, 'changeInvitedUserRole']);
    Route::put('/resend-invitation-link/{invitation}', [AuthController::class, 'resendInvitationLink']);
});

Route::prefix('invitation')->group(function() {
    Route::post('/accept-invitation', [AuthController::class, 'acceptInvitationAndSignUpUser']);
    Route::post('/verify-otp-to-accept-invitation', [AuthController::class, 'verifyOtpToAcceptInvitation']);
    Route::get('/{token}/valid',[AuthController::class, 'isInvitationValid']);
});

?>