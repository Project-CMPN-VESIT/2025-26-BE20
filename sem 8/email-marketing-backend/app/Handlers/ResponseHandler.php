<?php

namespace App\Handlers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ResponseHandler
{

    //Status 
    protected const SUCCESS_STATUS = "success";
    protected const ERROR_STATUS = "error";

    //Messages
    protected const SUCCESS_MESSAGE = "Success!";
    protected const ERROR_MESSAGE = "Error!";
    protected const UNAUTHORIZED_MESSAGE = "Unauthorized!";
    protected const NOT_FOUND_MESSAGE = "Not Found!";
    protected const BAD_REQUEST_MESSAGE = "Bad Request!";
    protected const FORBIDDEN_MESSAGE = "Forbidden!";
    protected const SERVER_ERROR_MESSAGE = "Internal Server Error!";
    protected const SUCCESSFULLY_CREATED_MESSAGE = "Successfully Created!";
    protected const UNPROCESSABLE_CONTENT = "Unprocessable Entity";

    public static function success(mixed $data, string $message=self::SUCCESS_MESSAGE, $statusCode=Response::HTTP_OK): JsonResponse
    {
        return response()->json([
            "status" => self::SUCCESS_STATUS,
            "message" => $message,
            "data" => $data,
        ], $statusCode);
    }

    public static function error(mixed $data,string $message, $statusCode=Response::HTTP_NOT_FOUND): JsonResponse
    {
        $response = [
            "status" => self::ERROR_STATUS,
            "message" => $message ?? self::ERROR_MESSAGE,
        ];

        if (!is_null($data)) {
            $response['errors'] = $data;
        }

        return response()->json($response, $statusCode);
    }

    public static function created(mixed $data, string $message = self::SUCCESSFULLY_CREATED_MESSAGE): JsonResponse
    {
        return self::success($data, $message, Response::HTTP_CREATED);
    }

    public static function unauthorized(string $message = self::UNAUTHORIZED_MESSAGE): JsonResponse
    {
        return self::error(null,$message, Response::HTTP_UNAUTHORIZED);
    }

    public static function not_found(string $message = self::NOT_FOUND_MESSAGE): JsonResponse
    {
        return self::error(null,$message, Response::HTTP_NOT_FOUND);
    }

    public static function badRequest(string $message = self::BAD_REQUEST_MESSAGE): JsonResponse
    {
        return self::error(null,$message, Response::HTTP_BAD_REQUEST);
    }

    public static function forbidden(string $message = self::FORBIDDEN_MESSAGE): JsonResponse
    {
        return self::error(null,$message, Response::HTTP_FORBIDDEN);
    }

    public static function internal_server_error(string $message = self::SERVER_ERROR_MESSAGE): JsonResponse
    {
        return self::error(null,$message, Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public static function unprocessable_content(string $message = self::UNPROCESSABLE_CONTENT): JsonResponse
    {
        return self::error(null,$message, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public static function validation_failed(array $data)
    {
        return self::error($data,"Validation Failed",Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
