<?php

namespace App\Features\Users\Services;

use App\Features\Users\Domains\Data\VerifyOtpData;
use App\Features\Users\Domains\Jobs\SendOtpJob;
use App\Handlers\RedisHandler;
use Illuminate\Support\Facades\Log;

class OtpService
{
    /**
     * Function to send otp
     *
     * @param string $email
     * @return void
     */
    public function sendOtp(string $email): void
    {
        $otp = random_int(1000,9999);
        $key = "otp:{$email}";

        if(config('app.env') !== 'production') {
            $day = date('d');
            $month = date('m');
            $otp = $day . $month;
        }

        RedisHandler::setex($key, 300, $otp);
        if(config('app.env') === 'production') {
            SendOtpJob::dispatch($email, $otp);
        }
    }

    /**
     * Function to verify otp
     *
     * @param VerifyOtpData $verifyOtpData
     * @return boolean
     */
    public function verifyOtp(VerifyOtpData $verifyOtpData): bool
    {
        $key = "otp:{$verifyOtpData->email}";

        $cachedOtp = RedisHandler::get($key);


        if($verifyOtpData->otp == $cachedOtp) return true;

        if($cachedOtp == $verifyOtpData->otp) {
            RedisHandler::delete($key);
            return true;
        }
        return false;
    }
}

?>