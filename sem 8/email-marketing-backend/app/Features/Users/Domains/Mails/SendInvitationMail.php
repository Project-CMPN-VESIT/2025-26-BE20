<?php

namespace App\Features\Users\Domains\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    protected string $url;

    /**
     * Create a new message instance.
     */
    public function __construct(string $url)
    {
        $this->url = $url;
    }

    public function build()
    {
        return $this->subject('Your Invitation Link')
                    ->view('emails.invitation')  
                    ->with(['url' => $this->url]);
    }
}
