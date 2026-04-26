<?php

namespace App\Features\Campaigns\Domains\Mails;

use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\EmailLists\Domains\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CampaignMail extends Mailable
{
    use Queueable, SerializesModels;

    private string $content;
    private Campaign $campaign;
    private Contact $contact;

    public function __construct(string $content, Campaign $campaign, Contact $contact)
    {
        $this->content = $content;
        $this->campaign = $campaign;
        $this->contact = $contact;
    }

    public function build()
    {
        return $this->subject($this->campaign->subject)
                    ->from($this->campaign->from_email, $this->campaign->from_name)
                    ->view('campaigns.htmlContent')
                    ->with([
                        'campaign' => $this->campaign,
                        'content' => $this->content,
                        'contact' => $this->contact
                    ]);
    }
}
