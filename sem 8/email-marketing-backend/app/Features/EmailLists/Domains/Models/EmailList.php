<?php

namespace App\Features\EmailLists\Domains\Models;

use App\Features\EmailLists\Domains\Data\AddContactToListData;
use App\Features\EmailLists\Domains\Data\CreateListData;
use App\Features\EmailLists\Domains\Data\ImportListData;
use App\Features\EmailLists\Domains\Imports\ContactsImport;
use App\Features\EmailLists\Services\EmailListService;
use App\Support\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;

class EmailList extends BaseModel
{

    public function contacts():BelongsToMany
    {
        return $this->belongsToMany(Contact::class);
    }

    public function getAllLists($perPage)
    {
        return $this::paginate($perPage); 
    }

    public function persistList(CreateListData $data, string $organization_id)
    {
        $list = $this::create([
            'id' => Str::uuid(),
            'name' => $data->name,
            'organization_id' => $organization_id,
            'description' => $data->description,
            'total_subscribers' => 0,
        ]);

        return $list;
    }

    public function importList(ImportListData $data, string $organization_id): self
    {
        DB::beginTransaction();
        $list = EmailList::create([
            'id' => Str::uuid(),
            'name' => $data->name,
            'organization_id' => $organization_id,
            'organization_id' => $organization_id,
            'description' => $data->description,
            'total_subscribers' => 0,
        ]);

        $filePath = $data->file->store('imports', config('filesystems.default'));

        Excel::import(new ContactsImport($list->id, $organization_id), $filePath, config('filesystems.default'));

        EmailListService::storeFailedContactInsertsData($list->id);

        $list->update([
            'total_subscribers' => $list->contacts()->count()
        ]);
        DB::commit();

        return $list;
    }

    public function getContactsByListId($list_id)
    {
        return $this::where('id',$list_id)
                        ->with('contacts')
                        ->firstOrFail()
                        ->contacts;
    }

    public function addContactsToLists(AddContactToListData $data):Contact
    {
        $contact =Contact::findOrFail($data->contactId);
        foreach( $data->listIds as $listId)
        {
            $list = self::findOrFail($listId);
            $list->contacts()->syncWithoutDetaching($contact->id);
        }
        return $contact->load('emailLists');
    }
    
}
