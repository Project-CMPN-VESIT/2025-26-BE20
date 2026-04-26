<?php

namespace App\Features\Users\Domains\Data;

use App\Features\Users\Domains\Transformers\UserRoleEnumTransformer;
use DateTime;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class InvitationData extends Data
{
    public function __construct(
        public ?string $organization_id,
        public string $email,
        public ?string $token,
        #[WithTransformer(UserRoleEnumTransformer::class)]
        public string $role,
        public ?DateTime $expires_at
    ) { }

    public static function rules(): array
    {
        return [
            'organization_id' => ['nullable', 'uuid'],
            'email' => ['required', 'string', 'email', 
                        Rule::unique('invitations', 'email'),
                        Rule::unique('users', 'email')],
            'token' => ['nullable', 'string'],
            'role' => ['required', 'string', Rule::in(['workspace_admin', 'marketer', 'viewer'])],
            'expires_at' => ['nullable', 'date']
        ];
    }

    public static function messages(): array
    {
        return [
            'organization_id.uuid' => 'The organization ID must be a valid UUID.',

            'email.required' => 'An email address is required.',
            'email.string' => 'The email must be a valid string.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already in use.',

            'token.string' => 'The token must be a valid string.',

            'role.required' => 'A role is required.',
            'role.string' => 'The role must be a valid string.',
            'role.in' => 'The selected role is invalid. Allowed roles are: workspace_admin, marketer, viewer.',

            'expires_at.date' => 'The expiration date must be a valid date.',
        ];
    }

    /**
     * Set organization Id
     *
     * @param string $organization_id
     * @return void
     */
    public function setOrganizationId(string $organization_id): void
    {
        $this->organization_id = $organization_id;
    }

    /**
     * Set expires at time
     *
     * @param DateTime $expires_at
     * @return void
     */
    public function setExpiresAt(DateTime $expires_at): void
    {
        $this->expires_at = $expires_at;
    }

    /**
     * Setting token
     *
     * @param string $token
     * @return void
     */
    public function setToken(string $token): void
    {
        $this->token = $token;
    }
}

?>