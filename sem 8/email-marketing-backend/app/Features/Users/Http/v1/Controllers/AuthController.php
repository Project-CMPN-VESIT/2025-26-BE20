<?php

namespace App\Features\Users\Http\v1\Controllers;

use App\Features\Plans\Services\SubscriptionService;
use App\Features\Users\Domains\Data\ForgotPasswordData;
use App\Features\Users\Domains\Data\InvitationAndUrlData;
use App\Features\Users\Domains\Data\LoginUserData;
use App\Features\Users\Domains\Data\ResendOtpData;
use App\Features\Users\Domains\Data\ResetPasswordData;
use App\Features\Users\Domains\Data\ResetPasswordForLoggedInUserData;
use App\Features\Users\Domains\Data\TokenAndUserData;
use App\Features\Users\Domains\Data\UpdateOrganizationData;
use App\Features\Users\Domains\Data\UpdateUserData;
use App\Features\Users\Domains\Data\UserAndOrganizationData;
use App\Features\Users\Domains\Data\UserData;
use App\Features\Users\Domains\Data\UserRoleAndEmailData;
use App\Features\Users\Domains\Data\UserRoleData;
use App\Features\Users\Domains\Data\VerifyOtpData;
use App\Features\Users\Domains\Models\Invitation;
use App\Features\Users\Http\v1\Resources\InvitationResource;
use App\Features\Users\Http\v1\Resources\OrganizationResource;
use App\Features\Users\Http\v1\Resources\UserResource;
use App\Features\Users\Services\AuthService;
use App\Features\Users\Services\InvitationService;
use App\Features\Users\Services\OrganizationService;
use App\Features\Users\Services\OtpService;
use App\Features\Users\Services\TokenService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController
{
    public function __construct(
        private AuthService $authService,
        private OrganizationService $organizationService,
        private InvitationService $invitationService,
        private OtpService $otpService,
        private TokenService $tokenService,
        private SubscriptionService $subscriptionService
    ) { }

    /**
     * Signup
     *
     * @param UserAndOrganizationData $userAndOrganizationData
     * @return JsonResponse
     */
    public function signUp(UserAndOrganizationData $userAndOrganizationData): JsonResponse
    {
        OrganizationService::storeOrganizationDataTemporarily($userAndOrganizationData->organization, $userAndOrganizationData->user->email);
        AuthService::storeUserDataTemporarily($userAndOrganizationData->user);
        $this->otpService->sendOtp($userAndOrganizationData->user->email);
        return ResponseHandler::success(null, 'Please verify otp from provided email', Response::HTTP_OK);
    }

    /**
     * Verifying otp when signup
     *
     * @param VerifyOtpData $verifyOtpData
     * @return JsonResponse
     */
    public function verifyOtp(VerifyOtpData $verifyOtpData): JsonResponse
    {
        if($this->otpService->verifyOtp($verifyOtpData)) {
            $userAndOrganizationArr = $this->organizationService->createOrganizationAndUser($verifyOtpData->email);
            $user = $userAndOrganizationArr['user'];
            $organization = $userAndOrganizationArr['organization'];
            
            return ResponseHandler::created([
                'user' => UserResource::fromModel($user), 
                'organization' => OrganizationResource::fromModel($organization), 
                'token' => JWTAuth::fromUser($user)
            ], "User and Organization created Successfully");
        }
        return ResponseHandler::unauthorized('Otp is incorrect or expired');
    }

    /**
     * Login
     *
     * @param LoginUserData $loginUserData
     * @return JsonResponse
     */
    public function login(LoginUserData $loginUserData): JsonResponse
    {
        $user = $this->authService->findUserByEmail($loginUserData->email);
        if(!$user) return ResponseHandler::not_found("No user found with email {$loginUserData->email}");
        $userObj = UserData::from($user);
        if(!$this->authService->verifyPassword($user->password, $loginUserData->password)) {
            return ResponseHandler::unauthorized('Invalid credentials, Please check your email and password');
        }
        $this->otpService->sendOtp($userObj->email);
        return ResponseHandler::success(null, 'Otp sent successfully', Response::HTTP_OK);
    }

    /**
     * Verifying otp when login
     *
     * @param verifyOtpData $verifyOtpData
     * @return JsonResponse
     */
    public function verifyOtpWhenLogin(verifyOtpData $verifyOtpData): JsonResponse
    {
        if($this->otpService->verifyOtp($verifyOtpData)) {
            $user = $this->authService->findUserByEmail($verifyOtpData->email);
            return ResponseHandler::success([
                'user' => UserResource::fromModel($user), 
                'token' => JWTAuth::fromUser($user)
            ], "User logged in Successfully", Response::HTTP_OK);
        }
        return ResponseHandler::unauthorized('Otp is incorrect or expired');
    }

    /**
     * Updating user details
     *
     * @param UpdateUserData $updateUserData
     * @return JsonResponse
     */
    public function updateUser(UpdateUserData $updateUserData): JsonResponse
    {
        $user = auth('api')->user();
        $user = $this->authService->updateUser($updateUserData);
        return ResponseHandler::success(['user' => UserResource::fromModel($user)], 'User updated successfully', 200);
    }

    /**
     * Updating organization details
     *
     * @param UpdateOrganizationData $updateOrganizationData
     * @return JsonResponse
     */
    public function updateOrganization(UpdateOrganizationData $updateOrganizationData): JsonResponse
    {
        $organization_id = auth('api')->user()->organization_id;
        $organization = $this->organizationService->updateOrganization($updateOrganizationData, $organization_id);
        return ResponseHandler::success(['organization' => OrganizationResource::fromModel($organization)], 'Organization updated successfully', 200);
    }

    /**
     * Forgot Password
     *
     * @param ForgotPasswordData $forgotPasswordData
     * @return JsonResponse
     */
    public function forgotPassword(ForgotPasswordData $forgotPasswordData): JsonResponse
    {
        if(!$user = $this->authService->findUserByEmail($forgotPasswordData->email)) {
            return ResponseHandler::not_found('User with this email not found');
        }
        $this->tokenService->sendRandomToken($forgotPasswordData->email, 60000, $forgotPasswordData->redirect_url);
        return ResponseHandler::success(null, 'Forgot Password link sent successfully', response::HTTP_OK);
    }

    /**
     * Reset password
     *
     * @param ResetPasswordData $resetPasswordData
     * @return JsonResponse
     */
    public function resetPassword(ResetPasswordData $resetPasswordData): JsonResponse
    {
        $userEmail = $this->tokenService->verifyToken($resetPasswordData->token);
        if(!$userEmail) {
            return ResponseHandler::unauthorized("Link is expired or broken");
        }
        $user = $this->authService->updatePasswordForLoggedOutUser($resetPasswordData, $userEmail);
        return ResponseHandler::success([
            'user' => UserResource::fromModel($user),
            'token' => JWTAuth::fromUser($user)
        ], 'Password Updated successfully', 200);
    }

    /**
     * Reset password when user is logged in
     *
     * @param ResetPasswordForLoggedInUserData $resetPasswordForLoggedInUserData
     * @return JsonResponse
     */
    public function resetPasswordWithLoggedInUser(ResetPasswordForLoggedInUserData $resetPasswordForLoggedInUserData): JsonResponse
    {
        $user = $this->authService->updatePasswordForLoggedInUser($resetPasswordForLoggedInUserData);
        return ResponseHandler::success([
            'user' => UserResource::fromModel($user)
        ], 'Password updated successfully', Response::HTTP_OK);
    }

    /**
     * Creating invitation
     *
     * @param InvitationAndUrlData $invitationAndUrlData
     * @return JsonResponse
     */
    public function createInvitation(InvitationAndUrlData $invitationAndUrlData): JsonResponse
    {
        $token = $this->tokenService->getRandomToken($invitationAndUrlData->invitation->email);

        $invitation = $this->invitationService->createInvitation($invitationAndUrlData->invitation, $token);
        $this->invitationService->sendInvitationLink($invitationAndUrlData->invitation, $invitationAndUrlData->redirect_url);
        return ResponseHandler::created(['invitation' => InvitationResource::fromModel($invitation)], 'Invitation created successfully');
    }

    /**
     * Accepting invitation and creating user
     *
     * @param TokenAndUserData $tokenAndUserData
     * @return JsonResponse
     */
    public function acceptInvitationAndSignUpUser(TokenAndUserData $tokenAndUserData): JsonResponse
    {
        $this->invitationService->acceptInvitation($tokenAndUserData);
        $this->otpService->sendOtp($tokenAndUserData->user->email);
        return ResponseHandler::success(null, 'Please verify otp from provided email', Response::HTTP_OK);
    }

    /**
     * Verifying otp after accepting invitation
     *
     * @param VerifyOtpData $verifyOtpData
     * @return JsonResponse
     */
    public function verifyOtpToAcceptInvitation(VerifyOtpData $verifyOtpData): JsonResponse
    {
        if($this->otpService->verifyOtp($verifyOtpData)) {
            $user = $this->invitationService->createUser($verifyOtpData->email);
            return ResponseHandler::created(['user' => UserResource::fromModel($user), 'token' => JWTAuth::fromUser($user)], "User created successfully");
        }
        return ResponseHandler::unauthorized('Otp is incorrect or expired');
    }

    /**
     * Changing invitation user role
     *
     * @param UserRoleData $userRoleData
     * @param Invitation $invitation
     * @return JsonResponse
     */
    public function changeInvitedUserRole(UserRoleData $userRoleData, Invitation $invitation): JsonResponse
    {
        $invitation = $this->invitationService->updateUserRole($userRoleData, $invitation);
        if(!$invitation) {
            return ResponseHandler::forbidden('Invitation has expired');
        }
        return ResponseHandler::success(['invitation' => InvitationResource::fromModel($invitation)], 'User role updated successfully', Response::HTTP_OK);
    }

    public function isInvitationValid(string $token): JsonResponse
    {
        $invitation = $this->invitationService->findInvitationFromToken($token);
        if(is_null($invitation)) {
            return ResponseHandler::unauthorized("Invitation link is invalid!");
        }
        $email = $this->invitationService->isInvitationValid($invitation);
        if(is_null($email)) {
            return ResponseHandler::error(null, 'This invitation link has expired!', 410);
        }
        return ResponseHandler::success((['valid'=> true, 'email' => $email]));
    }

    /**
     * Changing user role
     *
     * @param UserRoleAndEmailData $userRoleAndEmailData
     * @return JsonResponse
     */
    public function updateUserRole(UserRoleAndEmailData $userRoleAndEmailData): JsonResponse
    {
        $user = $this->authService->updateUserRole($userRoleAndEmailData);
        if(!$user) {
            ResponseHandler::badRequest('Could not update user');
        }

        return ResponseHandler::success(['user' => UserResource::fromModel($user)], 'User role updated successfully', Response::HTTP_OK);
    }

    /**
     * Resend Invitation link
     *
     * @param Invitation $invitation
     * @return JsonResponse
     */
    public function resendInvitationLink(Invitation $invitation): JsonResponse
    {
        if($invitation->is_accepted){
            return ResponseHandler::badRequest('The request is already accepted');
        }
        $token = $this->tokenService->getRandomToken($invitation->email);
        $invitation = $this->invitationService->resendInvitationLink($invitation, $token);
        return ResponseHandler::success(['invitation' => InvitationResource::fromModel($invitation)], 'Invitation sent successfully', Response::HTTP_OK);
    }

    /**
     * Get all invitations
     *
     * @return JsonResponse
     */
    public function getAllInvitations(): JsonResponse
    {
        $invitations = $this->invitationService->getAllInvitations();
        return ResponseHandler::success(['invitations' => InvitationResource::collect($invitations)], 'Invitations fetched successfully', Response::HTTP_OK);
    }

    /**
     * Get all users
     *
     * @return JsonResponse
     */
    public function getAllUsers(): JsonResponse
    {
        $users = $this->authService->getAllUsers();
        return ResponseHandler::success(['users' => UserResource::collect($users)], 'Users fetched successfully', Response::HTTP_OK);
    }

    /**
     * Resend Otp for verification
     *
     * @param ResendOtpData $resendOtpData
     * @return JsonResponse
     */
    public function resendOtp(ResendOtpData $resendOtpData): JsonResponse
    {
        $this->otpService->sendOtp($resendOtpData->email);
        return ResponseHandler::success(null, 'Otp sent successfully', Response::HTTP_OK);
    }

    /**
     * Get current logged in user details
     *
     * @return JsonResponse
     */
    public function getUserDetails(): JsonResponse
    {
        $user = auth('api')->user();
        return ResponseHandler::success(['user' => UserResource::fromModel($user)], 'User fetched successfully', Response::HTTP_OK);
    }

    /**
     * Get organization details
     *
     * @return JsonResponse
     */
    public function getOrganizationDetails(): JsonResponse
    {
        $organization_id = auth('api')->user()->organization_id;
        $organization = $this->organizationService->findOrganizationById($organization_id);
        return ResponseHandler::success(['organization' => OrganizationResource::fromModel($organization)], 'Organization fetched successfully', Response::HTTP_OK);
    }
}
