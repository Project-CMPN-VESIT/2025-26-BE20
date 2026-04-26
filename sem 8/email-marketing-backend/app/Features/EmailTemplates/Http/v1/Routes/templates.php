<?php

use App\Features\EmailTemplates\Http\v1\Controllers\EmailTemplatesController;
use App\Features\EmailTemplates\Http\v1\Controllers\PredefinedTemplatesController;
use App\Features\EmailTemplates\Http\v1\Controllers\TemplateCategoryController;
use Illuminate\Support\Facades\Route;
Route::middleware('auth:api')->group(function(){
    
    Route::prefix('predefined_templates')->group(function(){
        Route::get('/',[PredefinedTemplatesController::class,'index']);
        Route::post('/create',[PredefinedTemplatesController::class,'create']);
        Route::get('/{predefinedTemplate}',[PredefinedTemplatesController::class,'show']);
        Route::put('/{predefinedTemplate}',[PredefinedTemplatesController::class,'update']);
        Route::put('/{predefinedTemplate}/update_state',[PredefinedTemplatesController::class,'updateState']);
        Route::get('/{predefinedTemplate}/state',[PredefinedTemplatesController::class,'getStateByTemplateId']);
    });
    
    Route::prefix('custom_templates')->group(function(){
        Route::get('/',[EmailTemplatesController::class,'index']);
        Route::get('/category/{category}',[EmailTemplatesController::class,'getTemplatesByCategory']);
        Route::post('/create',[EmailTemplatesController::class,'create']);
        Route::put('/{emailTemplate}',[EmailTemplatesController::class,'update']);
        Route::post('/upload-image',[EmailTemplatesController::class,'uploadImage']);
        Route::delete('/{emailTemplate}',[EmailTemplatesController::class,'delete']);
        Route::put('/{emailTemplate}/update_state',[EmailTemplatesController::class,'updateState']);
        Route::get('/{emailTemplate}/state',[EmailTemplatesController::class,'getStateByTemplateId']);
    });

    Route::get('/templates/{emailTemplateId}',[EmailTemplatesController::class,'show']);

    Route::get('/template-categories',[TemplateCategoryController::class,'index']);
    Route::get('/template-states',[EmailTemplatesController::class,'getAllTemplateStates']);
});
