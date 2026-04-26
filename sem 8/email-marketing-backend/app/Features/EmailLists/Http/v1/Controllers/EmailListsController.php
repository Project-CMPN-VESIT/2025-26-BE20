<?php

namespace App\Features\EmailLists\Http\v1\Controllers;

use App\Features\EmailLists\Domains\Data\AddContactToListData;
use App\Features\EmailLists\Domains\Data\CreateListData;
use App\Features\EmailLists\Domains\Data\ImportListData;
use App\Features\EmailLists\Domains\Models\EmailList;
use App\Features\EmailLists\Services\EmailListService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EmailListsController
{
    public function __construct(
        private EmailListService $emailListService
    ) {}

    /**
     * Retrieve a paginated list of all email lists with their associated contacts.
     *
     * @return JsonResponse JSON response containing paginated email lists.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = min((int)$request->get('per_page'),100);
        $lists = $this->emailListService->listAll($perPage);
        return ResponseHandler::success($lists, 'All Lists', Response::HTTP_OK);
    }

    /**
     * Create a new email list.
     *
     * @param CreateListData $data
     * @return JsonResponse JSON response containing the created email list.
     */
    public function store(CreateListData $data):JsonResponse
    {
        $list =  $this->emailListService->createList($data,auth('api')->user()->organization_id);
        return ResponseHandler::success($list,"List Created successfully!",Response::HTTP_OK);
    }

    /**
     * Import contacts into a newly created email list from a CSV or Excel file.
     *
     * @param ImportListData $data
     * @return JsonResponse JSON response containing the imported list and contact details.
     */
    public function importList(ImportListData $data): JsonResponse
    {
        $list = $this->emailListService->importList($data, auth('api')->user()->organization_id);

        $failedContactsExists = $this->emailListService->checkWhetherFailedContactsExists($list->id);

        return ResponseHandler::success(['list' => $list, 'failed_contacts_exists' => $failedContactsExists], "Inserted " . $list->total_subscribers ." contacts successfully.");
    }

    public function getContactByListId(Response $response, string $list_id):JsonResponse
    {
        $contacts = $this->emailListService->getContactsByListId($list_id);

        return ResponseHandler::success($contacts,"All Contacts",Response::HTTP_OK);
    }

    public function addContactToLists(AddContactToListData $data)
    {
        $contact =  $this->emailListService->addContactToListIds($data);
        return ResponseHandler::success($contact,"Contact Added Successfully",Response::HTTP_OK);
    }

    public function getFailedContactInsertsFile(EmailList $list)
    {
        $headers = ['first_name', 'last_name', 'email', 'description'];
        $data = EmailListService::getFailedContactsInsertsByListId($list->id);

        if(count($data) <= 0)
        {
            return ResponseHandler::success(null, 'No failed contact inserts found', Response::HTTP_OK);
        }

        $csv = $this->emailListService->generateCsv($headers, $data, 'failed-contact-inserts.csv');

        return response()->streamDownload(
            fn () => print($csv['content']),
            $csv['filename'],
            ['Content-Type' => 'text/csv']
        );
    }
}