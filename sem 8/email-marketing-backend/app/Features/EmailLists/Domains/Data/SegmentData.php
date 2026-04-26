<?php
namespace App\Features\EmailLists\Domains\Data;
use Spatie\LaravelData\Data;

class SegmentData extends Data
{
    public function __construct(
        public string $name,
    ){}

    public static function rules():array
    {
        return [
            'name' => ['required', 'string', 'max:255','unique:segments,name'],
        ];
    }
}