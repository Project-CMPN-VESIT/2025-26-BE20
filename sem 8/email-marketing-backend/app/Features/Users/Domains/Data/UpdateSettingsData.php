<?php

namespace App\Features\Users\Domains\Data;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class UpdateSettingsData extends Data
{
    public function __construct(
        public string $sender_name,
        public string $sender_email,
        public ?bool $add_recipients_name,
        public ?UploadedFile $default_logo_image,
        public ?string $default_logo,
        public ?bool $campaign_track_opens,
        public ?bool $campaign_google_analytics_tracking,
        public ?bool $automation_track_opens,
        public ?bool $automation_google_analytics_tracking,
        public ?array $social_links,
        public ?bool $force_update_social_links,
        public ?string $organization_details,
        public ?bool $force_update_organization_details,
        public ?string $unsubscribe_disclaimer,
        public ?string $email_unsubscribe_link_text,
        public ?bool $force_update_email_unsubscribe_link_text,
        public ?string $email_preference_link_text,
        public ?bool $force_update_email_preference_link_text
    ) { }

    public static function rules(): array
    {
        return [
            'sender_name' => ['required', 'string'],
            'sender_email' => ['required', 'string', 'email'],
            'add_recipients_name' => ['required', 'boolean'],
            'default_logo_image' => ['sometimes', 'file', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'default_logo' => ['sometimes', 'string', 'url'],
            'campaign_track_opens' => ['required', 'boolean'],
            'campaign_google_analytics_tracking' => ['required', 'boolean'],
            'automation_track_opens' => ['required', 'boolean'],
            'automation_google_analytics_tracking' => ['required', 'boolean'],
            'social_links' => ['sometimes', 'array'],
            'social_links.*.handle' => ['required', 'string'],
            'social_links.*.url' => ['required', 'string'],
            'force_update_social_links' => ['required', 'boolean'],
            'organization_details' => ['sometimes', 'string'],
            'force_update_organization_details' => ['required', 'boolean'],
            'unsubscribe_disclaimer' => ['sometimes', 'string'],
            'email_unsubscribe_link_text' => ['sometimes', 'string'],
            'force_update_email_unsubscribe_link_text' => ['required', 'boolean'],
            'email_preference_link_text' => ['sometimes', 'string'],
            'force_update_email_preference_link_text' => ['required', 'boolean'],
        ];
    }
}

?>