<?php
namespace App\Features\EmailTemplates\Domains\Data;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class UploadImageData extends Data
{
    public function __construct(
        public UploadedFile $file,
    ){}

    public static function rules():array
    {
        return [
            'file' => ['required','file','image','mimes:jpeg,jpg'],
        ];
    }

    public static function messages()
    {
        return [
            'file.required' => 'File is required!',
            'file.file' => 'It should be an file',
            'file.image' => 'It should be a image'
        ];
    }
}