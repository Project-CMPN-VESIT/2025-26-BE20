<?php

namespace App\Features\EmailLists\Services;

use App\Features\EmailLists\Domains\Data\ContactData;
use App\Features\EmailLists\Domains\Data\SearchContactData;
use App\Features\EmailLists\Domains\Models\Contact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ContactService
{
    public function __construct(
        public Contact $contact
    ) { 
    }
    
    /**
     * Fetching all contacts
     *
     * @param integer $perPage
     * @return LengthAwarePaginator
     */
    public function getAllContacts(int $page, int $perPage, string $organizationId): LengthAwarePaginator
    {
        return Contact::where('organization_id', $organizationId)->paginate($perPage, ['*'], 'page', $page);    
    }

    /**
     * Creating a new subscriber
     *
     * @param ContactData $data
     * @param string $organization_id
     * @return Contact
     */
    public function createContact(ContactData $data, string $organizationId): Contact
    {    
        return $this->contact->persistContact($data,$organizationId); 
    }

    /**
     * Checking for contacts with the existing email
     *
     * @param ContactData $contactData
     * @return boolean
     */
    public function checkWhetherEmailExists(ContactData $contactData, string $organizationId): bool
    {
        $exists = $this->contact->checkWhetherEmailExists($contactData->email, $organizationId);

        return $exists;
    }

    public function searchContacts(SearchContactData $searchContactData, string $organizationId, int $page, int $perPage)
    {
        $contacts  = Contact::where('organization_id', $organizationId)
                    ->where(function ($query) use ($searchContactData) {
                        $query->where('email', 'LIKE', '%' . $searchContactData->value . '%')
                            ->orWhere('first_name', 'LIKE', '%' . $searchContactData->value . '%')
                            ->orWhere('last_name', 'LIKE', '%' . $searchContactData->value . '%');
                    })->paginate($perPage, ['*'], 'page', $page);

        return $contacts;
    }
}
