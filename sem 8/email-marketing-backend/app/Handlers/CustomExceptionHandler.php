<?php

namespace App\Handlers;

use App\Features\Users\Domains\Exceptions\NothingToUpdateException;
use App\Handlers\ResponseHandler;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Throwable;

class CustomExceptionHandler extends Handler{

    protected $dontReport = [
        NothingToUpdateException::class
    ];

    protected $dontFlash = [];

    public function render($request, Throwable $e):Response | JsonResponse
    {
        if($e instanceof ValidationException){
            return ResponseHandler::validation_failed($e->errors());
        }else if($e instanceof AuthenticationException){
            return ResponseHandler::unauthorized($e->getMessage());
        }else if($e instanceof AuthorizationException){
            return ResponseHandler::forbidden($e->getMessage());
        }else if($e instanceof NotFoundHttpException){
            return ResponseHandler::not_found($e->getMessage());
        }else if($e instanceof ModelNotFoundException){
            return ResponseHandler::not_found(class_basename($e->getModel()) . " not found!");
        }else if($e instanceof UploadException){
            return ResponseHandler::unauthorized($e->getMessage());
        }else if($e instanceof UnprocessableEntityHttpException){
            return ResponseHandler::unprocessable_content($e->getMessage());
        } else if($e instanceof NothingToUpdateException) {
            return ResponseHandler::badRequest($e->getMessage());
        }else {
            return ResponseHandler::error(null,$e->getMessage(),Response::HTTP_NOT_FOUND);
        }
    }
}   