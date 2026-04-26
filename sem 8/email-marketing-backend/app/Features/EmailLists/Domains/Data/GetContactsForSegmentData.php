<?php

namespace App\Features\EmailLists\Domains\Data;

use Spatie\LaravelData\Data;

class GetContactsForSegmentData extends Data
{
    public function __construct(
        public string $segmentId
    ) {}

    public static function rules(): array
    {
        return [
            'segmentId' => ['required', 'uuid'],
        ];
    }
}
