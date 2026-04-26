<?php

namespace App\Features\Campaigns\Http\v1\Resources;

use App\Features\Campaigns\Domains\Models\Campaign;
use App\Features\EmailTemplates\Http\v1\Resources\EmailTemplateResource;
use DateTime;
use Spatie\LaravelData\Data;

class CampaignResource extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $subject,
        public string $preheader,
        public string $from_name,
        public string $from_email,
        public string $reply_to_email,
        public ?string $email_content,
        public ?EmailTemplateResource $email_template_id,
        public string $status,
        public ?DateTime $send_at,
        public int $total_recipients
    ) { }

    public static function fromModel(Campaign $campaign): self
    {
        return new self(
            id: $campaign->id,
            name: $campaign->name,
            subject: $campaign->subject,
            preheader: $campaign->preheader,
            from_name: $campaign->from_name,
            from_email: $campaign->from_email,
            reply_to_email: $campaign->reply_to_email,
            email_content: $campaign->email_content,
            email_template_id: is_null($campaign->email_template) ? null : EmailTemplateResource::fromModel($campaign->email_template),
            status: $campaign->status->toString(),
            send_at: $campaign->send_at,
            total_recipients: $campaign->total_recipients
        );
    }
}

?>