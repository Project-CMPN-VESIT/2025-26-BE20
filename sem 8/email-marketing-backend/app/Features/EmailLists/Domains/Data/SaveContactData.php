<?php
namespace App\Features\EmailLists\Domains\Data;
use Spatie\LaravelData\Data;

class SaveContactData extends Data
{
    public function __construct(
        public string $segmentId,
        public array $contactIds,
    ){}

    public static function rules():array
    {
        return [
            'segmentId' => ['required','uuid','exists:segments,id'],
            'contactIds' => ['required','array'],
            'contactIds.*' => ['required','uuid','exists:contacts,id'],
        ];
    }
}