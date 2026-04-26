<?php

namespace App\Features\Users\Domains\Data;

use App\Features\Users\Domains\Enums\UserRoleEnum;
use App\Features\Users\Domains\Transformers\UserRoleEnumTransformer;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class UserWithRoleData extends Data
{
    public function __construct(
        public readonly string $first_name,
        public readonly string $last_name,
        public ?string $email,
        public readonly string $password,
        public ?Carbon $email_verified_at,
        #[WithTransformer(UserRoleEnumTransformer::class)]
        public ?UserRoleEnum $role
    ) { }

    public static function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-]+$/'],
            'last_name' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s\-]+$/'],
            'email' => ['nullable', 'string', 'email:rfc,dns', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ];
    }

    public static function messages(): array
    {
        return [
            'first_name.required' => 'First name is required.',
            'first_name.string' => 'First name must be a valid string.',
            'first_name.max' => 'First name cannot be more than 255 characters.',
            'first_name.regex' => 'First name may only contain letters, spaces, and hyphens.',

            'last_name.required' => 'Last name is required.',
            'last_name.string' => 'Last name must be a valid string.',
            'last_name.max' => 'Last name cannot be more than 255 characters.',
            'last_name.regex' => 'Last name may only contain letters, spaces, and hyphens.',

            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a valid string.',
            'password.min' => 'Password must be at least 8 characters long.',
            'password.confirmed' => 'Password confirmation does not match.'
        ];
    }

    /**
     * Function to set user role
     *
     * @param UserRoleEnum $role
     * @return void
     */
    public function setRole(UserRoleEnum $role): void
    {
        $this->role = $role;
    }

    /**
     * Function to set user email
     *
     * @param string $email
     * @return void
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * Function to set email verified at
     *
     * @param Carbon $email_verified_at
     * @return void
     */
    public function setEmailVerifiedAt(Carbon $email_verified_at): void
    {
        $this->email_verified_at = $email_verified_at;
    }
}

?>