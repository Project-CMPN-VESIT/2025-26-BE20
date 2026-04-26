<?php

namespace App\Features\Campaigns\Domains\Jobs;

use App\Features\Campaigns\Domains\Data\CampaignLogData;
use App\Features\Campaigns\Domains\Enums\CampaignLogStatusEnum;
use App\Features\Campaigns\Domains\Mails\CampaignMail;
use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\Campaigns\Domains\Models\CampaignLog;
use App\Features\EmailLists\Domains\Models\Contact;
use App\Features\EmailTemplates\Domains\Models\EmailTemplate;
use App\Features\EmailTemplates\Domains\Models\PredefinedTemplate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\Middleware\RateLimited;
use Illuminate\Support\Facades\Mail;

class SendCampaignEmailJob implements ShouldQueue
{
    use Queueable;

    private Contact $contact;
    private PredefinedTemplate|EmailTemplate $template;
    private Campaign $campaign;
    private CampaignLog $campaignLog;

    /**
     * Create a new job instance.
     */
    public function __construct(Contact $contact, PredefinedTemplate|EmailTemplate $template, Campaign $campaign)
    {
        $this->contact = $contact;
        $this->template = $template;
        $this->campaign = $campaign;
    }

    public function middleware()
    {
        return [
            new RateLimited('campaign-email-limit')
        ];
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->campaignLog = CampaignLog::create((CampaignLogData::from([
                'campaign_id' => $this->campaign->id,
                'contact_id' => $this->contact->id,
                'status' => CampaignLogStatusEnum::PENDING
        ]))->toArray());
        try {
            $content = $this->template->html_content;

            preg_match_all('/\$\{\{(\w+)\}\}/', $content, $matches);
            $placeholders = $matches[1];

            foreach($placeholders as $attr) {
                if(isset($this->contact->$attr)) {
                    $content = str_replace('${{' . $attr . '}}', $this->contact->$attr, $content);
                }
            }

            $baseUrl = env('APP_URL') . '/api/v1/tracking/click/' . $this->campaign->id . '/' . $this->contact->id;

            $content = preg_replace(
                '/<a\b[^>]*\bhref="([^"]*)"/is',
                '<a href="' . $baseUrl . '?url=$1"',
                $content
            );

            Mail::to($this->contact->email)->send(new CampaignMail($content, $this->campaign, $this->contact));

            $this->campaignLog->updateStatus(CampaignLogStatusEnum::SENT);
        } catch(\Throwable $e) {
            $this->campaignLog->updateFailureReason($e->getMessage());
            throw $e;
        }
    }
}
