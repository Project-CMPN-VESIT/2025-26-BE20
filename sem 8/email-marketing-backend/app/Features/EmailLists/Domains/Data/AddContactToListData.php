<?php
namespace App\Features\EmailLists\Domains\Data;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class AddContactToListData extends Data
{
    public function __construct(
        public string $contactId,
        public array $listIds
    ){}

    public static function rules():array
    {
        return [
            'contactId' => ['required','string','uuid',Rule::exists('contacts','id')],
            'listIds' => ['required','array'],
            'listIds.*' => ['uuid',Rule::exists('email_lists','id')]
        ];
    }

    public static function messages():array
    {
        return [
            'contactId.required' => 'Contact Id is required',
            'contactId.string' => 'The Contact Id field must be of type string',
            'contactId.uuid' => 'The contact id must be a valid uuid',
            'contactId.exists' => 'Contact Id should exists, such contact id doesnt exists',

            'listIds.required' => 'List Id array is required',
            'listIds.array' => 'List Id must be of type array',

            'listIds.*.uuid' => 'It must be a valid uuid',
            'listIds.*.exists' => 'Such uuid doesnt exists in lists'
        ];
    }
}