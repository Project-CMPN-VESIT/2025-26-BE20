<?php

namespace App\Features\Users\Domains\Jobs;

use App\Features\Users\Domains\Mails\SendForgotPasswordLinkMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendForgotPasswordLinkJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected string $email, 
        protected string $url
    ) { }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->email)->send(new SendForgotPasswordLinkMail($this->url));
    }
}
