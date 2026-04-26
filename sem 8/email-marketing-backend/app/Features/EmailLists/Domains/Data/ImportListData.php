<?php
namespace App\Features\EmailLists\Domains\Data;

use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class ImportListData extends Data
{
    public function __construct(
        public string $name,
        public string $description,
        public UploadedFile $file
    )
    {}

    public static function rules():array
    {
        return [
            'name' => ['required',Rule::unique('email_lists','name'),'string','max:255'],
            'description' => ['required','string'],
            'file' => ['required','file','mimes:csv,xlsx,xls'],
        ];
    }

    public static function messages():array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be of type string.',
            'name.unique' => 'List with name already exists.',
            'name.max' => 'The name field should only have 256 characters.',

            'description.required' => 'The description field is required.',
            'description.string' => 'The description must be of type string',

            'file.required' => 'The file field is required',
            'file.file' => 'The file field must be of file type',
            'file.mimes' => 'Unsupported File type!',
        ];
    }

}