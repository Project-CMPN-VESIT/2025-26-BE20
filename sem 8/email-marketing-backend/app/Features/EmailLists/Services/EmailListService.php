<?php

namespace App\Features\EmailLists\Services;

use App\Features\EmailLists\Domains\Data\AddContactToListData;
use App\Features\EmailLists\Domains\Models\EmailList;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Features\EmailLists\Domains\Data\CreateListData;
use App\Features\EmailLists\Domains\Data\ImportListData;
use App\Features\EmailLists\Domains\Models\Contact;
use App\Handlers\RedisHandler;
use App\Support\Helpers\RedisHelper;

class EmailListService
{
    public static $invalidContacts = [];

    public function __construct(public EmailList $emailList){}

    /**
     * Retrieve all email lists with their associated contacts, paginated by 15 per page.
     *
     * @return LengthAwarePaginator Paginated list of email lists with contacts.
     */
    public function listAll($perPage): LengthAwarePaginator
    {
        return $this->emailList->getAllLists($perPage);
    }

    /**
     * Create a new email list.
     *
     * @param CreateListData $data Data Transfer Object containing list creation details.
     * 
     * @return JsonResponse JSON response with the created list details and success message.
     */
    public function createList(CreateListData $data,$organization_id): EmailList
    {
       return $this->emailList->persistList($data,$organization_id);
    }

    /**
     * Import contacts from an Excel or CSV file into a newly created email list.
     *
     * @param ImportListData $data Data Transfer Object containing list creation details and file for import.
     * 
     * @return EmailList
     */
    public function importList(ImportListData $data,$organization_id): EmailList
    {
        return $this->emailList->importList($data,$organization_id);
    }

    /**
     * Fetching contacts from given list id
     *
     * @param string $list_id
     * @return void
     */
    public function getContactsByListId(string $list_id)
    {
        return $this->emailList->getContactsByListId($list_id);
    }

    /**
     * Adding contacts to list
     *
     * @param AddContactToListData $data
     * @return Contact
     */
    public function addContactToListIds(AddContactToListData $data):Contact
    {
       return $this->emailList->addContactsToLists($data);
    }

    /**
     * Adding invalid contact to invalidContacts Array
     *
     * @param array $contact
     * @return void
     */
    public static function addToInvalidContacts(array $contact): void
    {
        self::$invalidContacts[] = $contact;
    }

    /**
     * Storing failed contact inserts on redis
     *
     * @param array $data
     * @param string $list_id
     * @return void
     */
    public static function storeFailedContactInsertsData(string $list_id): void
    {
        $key = "failed_contacts_inserts_for_list:{$list_id}";
        if(count(self::$invalidContacts) == 0) return;
        RedisHelper::storeDataTemporarily(self::$invalidContacts, $key);
        
        self::$invalidContacts = [];
    }

    public function checkWhetherFailedContactsExists(string $list_id): bool
    {
        $key = "failed_contacts_inserts_for_list:{$list_id}";
        if(is_null(RedisHandler::get($key))) return false;
        return true;
    }

    /**
     * Getting stored failed contacts inserts from redis
     *
     * @param string $list_id
     * @return array
     */
    public static function getFailedContactsInsertsByListId(string $list_id): ?array
    {
        $key = "failed_contacts_inserts_for_list:{$list_id}";
        if(is_null(RedisHandler::get($key))) return null;
        $data  = RedisHelper::getTemporaryData($key);

        return $data;
    }

    /**
     * Generating csv file for failed contact inserts
     *
     * @param array $headers
     * @param array $rows
     * @param string $filename
     * @return array
     */
    public function generateCsv(array $headers, array $rows, string $filename = 'export.csv'): array
    {
        $handle = fopen('php://temp', 'r+');

        fputcsv($handle, $headers);

        foreach ($rows as $row) {
            fputcsv($handle, $row);
        }

        rewind($handle);
        $csvContent = stream_get_contents($handle);
        fclose($handle);

        return [
            'filename' => $filename,
            'content'  => $csvContent,
        ];
    }
}
