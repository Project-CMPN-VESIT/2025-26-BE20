<?php

namespace App\Features\Users\Services;

use App\Features\Users\Domains\Jobs\SendForgotPasswordLinkJob;
use App\Handlers\RedisHandler;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;

class TokenService
{
    /**
     * Sending random generate token
     *
     * @param string $email
     * @param integer $expiry
     * @param string $redirect_url
     * @return void
     */
    public function sendRandomToken(string $email, int $expiry, string $redirect_url): void
    {
        $key = "token:{$email}";

        $token = Crypt::encryptString($email);

        $url = $redirect_url . "?token={$token}";
        Log::info($url);

        RedisHandler::setex($key, $expiry, $token);
        SendForgotPasswordLinkJob::dispatch($email, $url);
    }

    /**
     * Verifying token
     *
     * @param string $token
     * @return string|null
     */
    public function verifyToken(string $token): ?string
    {
        $email = Crypt::decryptString($token);

        $key = "token:{$email}";

        if(is_null(RedisHandler::get($key))) return null;

        $cachedToken = RedisHandler::get($key);

        RedisHandler::delete($key);

        if($cachedToken === $token) {
            return $email;
        }
        return null;
    }

    /**
     * Generating random token
     *
     * @param string $email
     * @return string
     */
    public function getRandomToken(string $email): string
    {
        $token = Crypt::encryptString($email);
        return $token;
    }
}

?>