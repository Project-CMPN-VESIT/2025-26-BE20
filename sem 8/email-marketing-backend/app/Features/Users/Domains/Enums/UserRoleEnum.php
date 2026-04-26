<?php

namespace App\Features\Users\Domains\Enums;

use InvalidArgumentException;

enum UserRoleEnum: int
{
    case SUPER_ADMIN = 0;
    case WORKSPACE_ADMIN = 1;
    case MARKETER = 2;
    case VIEWER = 3;

    public static function fromString(string $value): self
    {
        return match(strtolower($value)) {
            'super_admin' => self::SUPER_ADMIN,
            'workspace_admin' => self::WORKSPACE_ADMIN,
            'marketer' => self::MARKETER,
            'viewer' => self::VIEWER,
            default => throw new InvalidArgumentException("Invalid user role: $value"),
        };
    }

    public function toString(): string
    {
        return match($this) {
            self::SUPER_ADMIN => 'super_admin',
            self::WORKSPACE_ADMIN => 'workspace_admin',
            self::MARKETER => 'marketer',
            self::VIEWER => 'viewer'
        };
    }
}
