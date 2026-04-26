<?php

namespace App\Support\Helpers;

use App\Handlers\RedisHandler;
use Exception;
use Illuminate\Http\Response;

class RedisHelper
{
    public static function storeDataTemporarily(mixed $data, string $key): void
    {
        $data = is_array($data) ? $data : $data->toArray();
        $data = json_encode($data);
        RedisHandler::set($key, $data);
    }

    public static function getTemporaryData(string $key): array
    {
        $data = RedisHandler::get($key);
        if(is_null($data)) {
            throw new Exception("Internal Server Error", Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        RedisHandler::delete($key);
        $data = json_decode($data, true);
        return $data;
    }
}

?>