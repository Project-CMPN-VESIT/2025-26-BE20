<?php

namespace App\Features\Users\Domains\Models;

use App\Features\Users\Domains\Data\CreateSettingsData;
use App\Features\Users\Domains\Data\UpdateSettingsData;
use App\Features\Users\Domains\Models\Organization;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Arr;

class Settings extends BaseModel
{
    protected $primaryKey = 'organization_id';

    public $incrementing = false;
    protected $keyType = 'string';

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    protected $casts = [
        'social_links' => 'array'
    ];

    /**
     * Created new stetings object
     *
     * @param CreateSettingsData $data
     * @return self
     */
    public function createSettings(CreateSettingsData $createSettingsData): self
    {
        return $this->create($createSettingsData->toArray());
    }

    /**
     * Updating organization settings
     *
     * @param UpdateSettingsData $updateSettingsData
     * @return boolean
     */
    public function updateSettings(UpdateSettingsData $updateSettingsData): bool
    {
        $data = $updateSettingsData->toArray();
        Arr::forget($data, 'default_logo_image');
        return $this->update($data);
    }

    /**
     * Getting settings for organization
     *
     * @param string $id
     * @return self
     */
    public function getSettingsForOrganization(string $id): ?self
    {
        return $this->where('organization_id', '=', $id)->first() ?? null;
    }
}
