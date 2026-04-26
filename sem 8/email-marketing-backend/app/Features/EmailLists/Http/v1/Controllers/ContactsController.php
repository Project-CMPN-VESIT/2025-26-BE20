<?php

namespace App\Features\EmailLists\Http\v1\Controllers;

use App\Features\EmailLists\Domains\Data\ContactData;
use App\Features\EmailLists\Domains\Data\SearchContactData;
use App\Features\EmailLists\Services\ContactService;
use App\Features\Users\Domains\Models\User;
use App\Handlers\ResponseHandler;
use App\Support\Utils\Util;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ContactsController
{
    public function __construct(protected ContactService $contactService){}

    /**
     * Provides paginated records of all subscribers
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request):JsonResponse
    {
        $perPage = min((int)$request->get('per_page'),100);
        $page = $request->integer('page');
        /** @var User $user */
        $user = Auth::user();
        $contacts = $this->contactService->getAllContacts($page, $perPage, $user->organization_id);
        return ResponseHandler::success($contacts, 'Fetched all contacts successfully', Response::HTTP_OK);
    }

    /**
     * Stores a single contact
     *
     * @param ContactData $data
     * @return JsonResponse
     */
    public function store(ContactData $data):JsonResponse
    {
        $organizationId = auth('api')->user()->organization_id;
        $exists = $this->contactService->checkWhetherEmailExists($data, $organizationId);

        if($exists) {
            return ResponseHandler::success(null, 'Subscriber with this email already exists', Response::HTTP_OK);
        }

        $contact =  $this->contactService->createContact($data, $organizationId);
        return ResponseHandler::success($contact,"Contact Created Successfully!",Response::HTTP_OK);
    }

    public function searchContacts(SearchContactData $searchContactData, Request $request): JsonResponse
    {
        $organizationId = auth('api')->user()->organization_id;
        $perPage = min((int)$request->get('per_page'),100);
        $page = $request->integer('page');
        $contacts = $this->contactService->searchContacts($searchContactData, $organizationId, $page, $perPage);
        return ResponseHandler::success($contacts, 'Fetched contacts successfully', Response::HTTP_OK);
    }

}