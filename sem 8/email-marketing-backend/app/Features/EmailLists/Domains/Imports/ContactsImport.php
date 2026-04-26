<?php

namespace App\Features\EmailLists\Domains\Imports;

use App\Features\EmailLists\Domains\Data\ContactData;
use App\Features\EmailLists\Domains\Models\Contact;
use App\Features\EmailLists\Services\EmailListService;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;

class ContactsImport implements OnEachRow,WithHeadingRow
{
    protected Contact $contact;
    protected ContactData $contactData;

    public function __construct(
        protected string $list_id, 
        protected string $organization_id
    ) {
        $this->contact = new Contact();
    }

    public function onRow(Row $row)
    {
        $row = $row->toArray();

        if($this->contact->checkWhetherEmailExists($row['email'], $this->organization_id)) {
            $invalidContact['first_name'] = $row['first_name'];
            $invalidContact['last_name'] = $row['last_name'];
            $invalidContact['email'] = $row['email'];
            $invalidContact['description'] = "Contact already exists";
            
            EmailListService::addToInvalidContacts($invalidContact);

            return;
        }

        try {
            ContactData::validate([
                'first_name' => $row['first_name'] ?? null,
                'last_name'  => $row['last_name'] ?? null,
                'email'      => $row['email'] ?? null,
            ]);

            $contactData = ContactData::from([
                'first_name' => $row['first_name'] ?? null,
                'last_name'  => $row['last_name'] ?? null,
                'email'      => $row['email'] ?? null,
            ]);
        } catch (ValidationException $e) {
            $invalidContact['first_name'] = $row['first_name'] ?? null;
            $invalidContact['last_name'] = $row['last_name'] ?? null;
            $invalidContact['email'] = $row['email'] ?? null;
            $invalidContact['description'] = implode(", ", $e->validator->errors()->all());

            EmailListService::addToInvalidContacts($invalidContact);

            return;
        }

        $newlyInsertedContact = $this->contact->persistContact($contactData, $this->organization_id);

        $newlyInsertedContact->emailLists()->attach($this->list_id);
    }
}
