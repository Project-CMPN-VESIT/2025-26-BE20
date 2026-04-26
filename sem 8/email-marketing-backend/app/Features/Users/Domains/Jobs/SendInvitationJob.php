<?php

namespace App\Features\Users\Domains\Jobs;

use App\Features\Users\Domains\Mails\SendInvitationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendInvitationJob implements ShouldQueue
{
    use Queueable;

    protected string $email;
    protected string $url;

    /**
     * Create a new job instance.
     */
    public function __construct(string $email, string $url)
    {
        $this->email = $email;
        $this->url = $url;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->email)->send(new SendInvitationMail($this->url));
    }
}
