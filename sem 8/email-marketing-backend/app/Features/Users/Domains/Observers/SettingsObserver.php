<?php

namespace App\Features\Users\Domains\Observers;

use App\Features\Users\Domains\Exceptions\NothingToUpdateException;
use App\Features\Users\Domains\Models\Settings;

class SettingsObserver
{

    /**
     * Handle the Settings "saving" event.
     */
    public function saving(Settings $settings): void
    {
        $settings->fill(request()->only([
            'sender_name',
            'sender_email',
            'add_recipients_name',
            'default_logo',
            'social_links',
            'campaign_track_opens',
            'campaign_google_analytics_tracking',
            'automation_track_opens',
            'automation_google_analytics_tracking',
            'force_update_social_links',
            'organization_details',
            'force_update_organization_details',
            'unsubscribe_disclaimer',
            'email_unsubscribe_link_text',
            'force_update_email_unsubscribe_link_text',
            'email_preference_link_text',
            'force_update_email_preference_link_text',
        ])); // If we won't use this then even if the incoming data to be updated is same, then too the exception won't be raised. This is because the incoming data is either true or false and original is 0 or 1 and hence it feels that there having been changes in the incoming data and doesn't throw an exception.
        if (!$settings->isDirty(['sender_name', 'sender_email', 'add_recipients_name', 'default_logo', 'campaign_track_opens', 'campaign_google_analytics_tracking', 'automation_track_opens', 'automation_google_analytics_tracking', 'social_links', 'force_update_social_links', 'organization_details', 'force_update_organization_details', 'unsubscribe_disclaimer', 'email_unsubscribe_link_text', 'force_update_email_unsubscribe_link_text', 'email_preference_link_text', 'force_update_email_preference_link_text'])) {
            throw new NothingToUpdateException('No changes detected in the data.');
        }
    }

}
