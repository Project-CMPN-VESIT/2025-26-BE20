<?php

namespace App\Features\Campaigns\Domains\Data;

use App\Features\Campaigns\Domains\Rules\CheckDomainAuthentication;
use App\Features\Campaigns\Domains\Rules\ExistsInEither;
use Spatie\LaravelData\Data;

class CreateCampaignData extends Data
{
    public function __construct(
        public ?string $organization_id,
        public ?string $user_id,
        public string $name,
        public string $subject,
        public string $preheader,
        public array $segment_ids,
        public string $from_name,
        public string $from_email,
        public string $reply_to_email,
        public ?int $total_recipients
    ) { }

    public static function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'subject' => ['required', 'string'],
            'preheader' => ['required', 'string'],
            'segment_ids' => ['required', 'array', 'min:1'],
            'segment_ids.*' => ['required', 'string', 'uuid', 'exists:segments,id'],
            'from_name' => ['required', 'string'],
            'from_email' => ['required', 'string', 'email', new CheckDomainAuthentication()],
            'reply_to_email' => ['required', 'string', 'email']
        ];
    }   

    public function setOrganizationId(string $organization_id): void
    {
        $this->organization_id = $organization_id;
    }

    public function setUserId(string $user_id): void
    {
        $this->user_id = $user_id;
    }

    public function setReplyToEmail(string $email): void
    {
        $this->reply_to_email = $email;
    }

    public function setTotalRecipients(int $total_recipients): void
    {
        $this->total_recipients = $total_recipients;
    }
}

?>