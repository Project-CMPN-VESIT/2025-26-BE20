<?php

namespace App\Features\Users\Domains\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendForgotPasswordLinkMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $url) { }

    public function build()
    {
        return $this->subject('Your Forgot Password Link')
                    ->view('emails.forgotPassword')
                    ->with(['url' => $this->url]);
    }
}
