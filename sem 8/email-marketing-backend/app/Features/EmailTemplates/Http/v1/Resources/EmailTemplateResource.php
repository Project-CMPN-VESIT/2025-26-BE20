<?php
namespace App\Features\EmailTemplates\Http\v1\Resources;

use App\Features\EmailTemplates\Domains\Enums\TemplateState;
use App\Features\EmailTemplates\Domains\Models\Template;
use Illuminate\Support\Facades\Storage;
use Spatie\LaravelData\Resource;

class EmailTemplateResource extends Resource
{
    public function __construct(
        public string $id,
        public ?string $organization_id,
        public string | TemplateState $state,
        public string $name,
        public ?string $thumbnail_url,
        public ?string $html_content,
        public mixed $design_json,
        public ?string $slug,
        public TemplateCategoryResource $category
    ){}

    /**
     * Creating resource from Templates model
     *
     * @param Template $template
     * @return self
     */
    public static function fromModel(Template $template): self
    {
        return new self(
            id: $template->id,
            organization_id: $template->organization_id,
            state: $template->state,
            name: $template->name,
            html_content: $template->html_content,
            design_json: $template->design_json,
            thumbnail_url: $template->thumbnail_url ? $template->thumbnail_url : null,
            slug: $template->slug,
            category: TemplateCategoryResource::from($template->category),
        );
    }

}