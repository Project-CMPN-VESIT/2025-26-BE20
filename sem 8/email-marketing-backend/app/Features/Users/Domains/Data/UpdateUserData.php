<?php

namespace App\Features\Users\Domains\Data;

use Spatie\LaravelData\Data;

class UpdateUserData extends Data
{
    public function __construct(
        public readonly string $first_name,
        public readonly string $last_name,
        public mixed $profile_image
    ) { }

    public static function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-]+$/'],
            'last_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-]+$/'],
            'profile_image' => ['sometimes', 'file', 'image', 'mimes:jpg,jpeg,png', 'max:2048']
        ];
    }

    public static function messages(): array
    {
        return [
            'first_name.required' => 'First name is required.',
            'first_name.string' => 'First name must be a string.',
            'first_name.max' => 'First name must not exceed 255 characters.',
            'first_name.regex' => 'First name may only contain letters, spaces, and hyphens.',

            'last_name.required' => 'Last name is required.',
            'last_name.string' => 'Last name must be a string.',
            'last_name.max' => 'Last name must not exceed 255 characters.',
            'last_name.regex' => 'Last name may only contain letters, spaces, and hyphens.',

            'profile_image.file' => 'The profile image must be a valid file.',
            'profile_image.image' => 'The profile image must be an image.',
            'profile_image.mimes' => 'The profile image must be a file of type: jpg, jpeg, png.',
            'profile_image.max' => 'The profile image must not be greater than 2MB.',
        ];
    }

    /**
     * Set profile image
     *
     * @param string $filePath
     * @return void
     */
    public function setProfileImage(string $filePath): void 
    {
        $this->profile_image = $filePath;
    }
}

?>