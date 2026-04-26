<?php

namespace App\Features\Users\Domains\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public int $otp) { }

    public function build()
    {
        return $this->subject("Your otp Code")
                    ->view('emails.otp')
                    ->with(['otp' => $this->otp]);
    }
}
