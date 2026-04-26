<?php

namespace App\Features\Users\Domains\Data;

use App\Features\Users\Domains\Enums\UserRoleEnum;
use App\Features\Users\Domains\Transformers\UserRoleEnumTransformer;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class UserRoleData extends Data
{
    public function __construct(
        #[WithTransformer(UserRoleEnumTransformer::class)]
        public readonly mixed $role
    ) { }

    public static function rules(): array
    {
        return [
            'role' => ['required', 'string', Rule::in(['workspace_admin', 'viewer', 'marketer'])]
        ];
    }
}

?>