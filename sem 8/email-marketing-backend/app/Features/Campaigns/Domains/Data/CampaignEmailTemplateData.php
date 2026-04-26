<?php

namespace App\Features\Campaigns\Domains\Data;

use App\Features\Campaigns\Domains\Rules\ExistsInEither;
use Spatie\LaravelData\Data;

class CampaignEmailTemplateData extends Data
{
    public function __construct(
        public string $email_content,
        public string $email_template_id
    ) { }

    public static function rules(): array
    {
        return [
            'email_content' => ['required', 'string'],
            'email_template_id' => ['required', 'string', 'uuid', new ExistsInEither('predefined_templates', 'email_templates')],
        ];
    }
}

?>