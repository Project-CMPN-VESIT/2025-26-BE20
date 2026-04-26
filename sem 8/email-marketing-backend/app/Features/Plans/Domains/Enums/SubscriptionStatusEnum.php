<?php

namespace App\Features\Plans\Domains\Enums;

enum SubscriptionStatusEnum: int
{
    case ACTIVE = 0;
    case INACTIVE = 1;

    public static function fromString(string $value): self
    {
        return match(strtolower($value)) {
            'active' => self::ACTIVE,
            'inactive' => self::INACTIVE
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
