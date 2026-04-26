<?php

namespace App\Features\Users\Http\v1\Resources;

use Illuminate\Support\Facades\Storage;
use Spatie\LaravelData\Data;

class SettingsResource extends Data
{
    public function __construct(
        public string $sender_name,
        public string $sender_email,
        public bool $add_recipients_name,
        public ?string $default_logo,
        public bool $campaign_track_opens,
        public bool $campaign_google_analytics_tracking,
        public bool $automation_track_opens,
        public bool $automation_google_analytics_tracking,
        public mixed $social_links,   
        public bool $force_update_social_links,
        public ?string $organization_details,
        public bool $force_update_organization_details,
        public ?string $unsubscribe_disclaimer,
        public ?string $email_unsubscribe_link_text,
        public bool $force_update_email_unsubscribe_link_text,
        public ?string $email_preference_link_text,
        public bool $force_update_email_preference_link_text
    ) {
        if(isset($this->default_logo)) {
            $this->default_logo = Storage::url($this->default_logo);
        }  
    }
}

?>