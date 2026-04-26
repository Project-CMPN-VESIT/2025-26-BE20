<?php

namespace App\Features\EmailLists\Domains\Models;

use App\Features\EmailLists\Domains\Data\ContactData;
use App\Features\EmailLists\Domains\Enums\ContactStatus;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class Contact extends BaseModel
{   

    protected $casts = [
        'status' => ContactStatus::class,
        'id' => 'string'
    ];

    public function emailLists(){
        return $this->belongsToMany(EmailList::class);
    }

    public function segments():BelongsToMany
    {
        return $this->belongsToMany(Segment::class);
    }

    public function persistContact(ContactData $data,string $organization_id):self
    {
        $contact = $this::create([
            "id" => Str::uuid(),
            "first_name" => $data->first_name,
            "last_name" => $data->last_name,
            "email" => $data->email,
            "email_verified_at" => now(),
            "organization_id" => $organization_id
        ]);

        return $contact;
    }

    public function getAllContacts(string $organizationId): Collection
    {
        return $this->where('organization_id', $organizationId)->get();
    }

    public function checkWhetherEmailExists(string $email, string $organization_id): bool
    {
        return $this::where('email', $email)->where('organization_id', $organization_id)->exists() ?? false;
    }

    public function getAllContactsCreatedBetween(Carbon $startTime, Carbon $endTime, string $organizationId): Collection
    {
        $contacts = $this->where('organization_id', $organizationId)
                            ->whereBetween('created_at', [$startTime, $endTime])
                            ->get();
        return $contacts;
    }
}
