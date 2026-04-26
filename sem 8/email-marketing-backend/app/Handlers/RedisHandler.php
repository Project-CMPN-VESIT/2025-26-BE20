<?php

namespace App\Handlers;

use Illuminate\Support\Facades\Cache;

class RedisHandler {
    
    public static function set(string $key, string $value):void{
        Cache::set($key,$value);
    }

    public static function setex(string $key, int $seconds, string $value):void{
        Cache::set($key,$value,$seconds);
    }

    public static function get(string $key): ?string{
        return Cache::get($key);
    }

    public static function delete(string $key):void{
        Cache::delete($key);
    }
}