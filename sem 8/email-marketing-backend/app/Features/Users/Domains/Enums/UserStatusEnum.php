<?php

namespace App\Features\Users\Domains\Enums;

use Illuminate\Support\Facades\Log;
use InvalidArgumentException;

enum UserStatusEnum: int
{
    case ACTIVE = 0;
    case INACTIVE = 1;

    public static function fromString($value): self
    {
        return match(strtolower($value)) {
            'active' => self::ACTIVE,
            'inactive' => self::INACTIVE,
            default => throw new InvalidArgumentException("Invalid user status: $value")
        };
    }

    public function toString(): string
    {
        return match($this) {
            self::ACTIVE => 'active',
            self::INACTIVE => 'inactive'
        };
    }
}
