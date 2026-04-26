<?php

namespace App\Features\EmailLists\Http\v1\Routes;

use App\Features\EmailLists\Http\v1\Controllers\EmailListsController;
use App\Features\EmailLists\Http\v1\Controllers\SegmentsController;
use App\Features\EmailLists\Http\v1\Controllers\ContactsController;

use Illuminate\Support\Facades\Route;

Route::middleware("auth:api")->group(function(){

    //Email List Routes
    Route::prefix('email-lists')->group(function() {
        Route::get('/lists',[EmailListsController::class,'index']);
        Route::post('/import',[EmailListsController::class,'importList']);
        Route::post('/create',[EmailListsController::class,'store']); // Remove
        Route::get('/{list_id}/contacts',[EmailListsController::class,'getContactByListId']);
        Route::post('/add-contact',[EmailListsController::class,'addContactToLists']);
        Route::get('/get-failed-contact-inserts/{list}', [EmailListsController::class, 'getFailedContactInsertsFile']);
    });

    //Segments Routes
    Route::prefix('segments')->group(function() {
        Route::get('/',[SegmentsController::class,'index']);
        Route::post('/create',[SegmentsController::class,'store']);
        Route::post('/{segmentId}/rules',[SegmentsController::class,'addRules']);
        Route::post('/get-contacts',[SegmentsController::class,'getContacts']);
        Route::post('/save-contact',[SegmentsController::class,'saveContacts']);
        Route::get('/get-segment-rules/{segment}',[SegmentsController::class,'getSegmentRulesWithSegment']);
        Route::get('/{segmentId}/exisiting-contacts',[SegmentsController::class,'exisitingContacts']);
    });

    //Contacts Routes
    Route::prefix('contacts')->group(function() {
        Route::post('/create',[ContactsController::class,'store']);
        Route::get('/',[ContactsController::class,'index']);
        Route::get('/search-contacts', [ContactsController::class, 'searchContacts']);
    });
});
