<?php

namespace App\Features\EmailLists\Http\v1\Controllers;

use App\Features\EmailLists\Domains\Data\AddRulesData;
use App\Features\EmailLists\Domains\Data\GetContactsForSegmentData;
use App\Features\EmailLists\Domains\Data\SegmentData;
use App\Features\EmailLists\Domains\Data\SaveContactData;
use App\Features\EmailLists\Domains\Models\Segment;
use App\Features\EmailLists\Services\SegmentService;
use App\Handlers\ResponseHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SegmentsController
{
    public function __construct(public SegmentService $segmentService){}

    public function index(Request $request):JsonResponse
    {
        $organizationId = auth('api')->user()->organization_id;
        $perPage = min((int)$request->get('per_page'),100);
        $segments = $this->segmentService->getAllSegements($perPage, $organizationId);
        return ResponseHandler::success($segments,"All Segments",Response::HTTP_OK);
    }

    public function store(SegmentData $data):JsonResponse
    {
        $segment =  $this->segmentService->createSegment($data);
        return ResponseHandler::created($segment,"Segment Created Successfully!");
    }

    public function addRules(AddRulesData $data,string $segmentId)
    {

        $segment =  $this->segmentService->addRules($data,$segmentId);
        return ResponseHandler::success($segment,"Rules Added Successfully!",Response::HTTP_OK);
    }

    public function getContacts(GetContactsForSegmentData $data, Request $request)
    {
        $perPage = min((int)$request->get('per_page'),100);
        $page = $request->integer('page');
        $contacts =  $this->segmentService->getContactsForSegment($data);
        return ResponseHandler::success($contacts,"All Contacts For Segment",Response::HTTP_OK);
    }

    public function saveContacts(SaveContactData $data)
    {
        $contacts = $this->segmentService->saveContacts($data);
        return ResponseHandler::success($contacts,"Contacts Saved Successfully",Response::HTTP_OK);
    }

    public function exisitingContacts(string $segmentId){
        $segment = $this->segmentService->existingContacts($segmentId);
        return ResponseHandler::success($segment,"All Contacts");
    }

    public function getSegmentRulesWithSegment(Segment $segment): JsonResponse
    {
        $segmentRules = $this->segmentService->getRulesForSegment($segment);

        return ResponseHandler::success(['rules' => $segmentRules, 'segment' => $segment], "Fetched segment rules successfully", Response::HTTP_OK);
    }
}
