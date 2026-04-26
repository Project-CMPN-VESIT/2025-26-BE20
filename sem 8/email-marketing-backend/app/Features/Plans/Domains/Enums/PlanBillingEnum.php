<?php

namespace App\Features\Plans\Domains\Enums;

enum PlanBillingEnum: int
{
    case FREE = 0;
    case MONTHLY = 1;
    case YEARLY = 2;

    public static function fromString(string $value): self
    {
        return match(strtolower($value)) {
            'free' => self::FREE,
            'monthly' => self::MONTHLY,
            'yearly' => self::YEARLY
        };
    }

    public function toString(): string
    {
        return match($this) {
            self::FREE => 'free',
            self::MONTHLY => 'monthly',
            self::YEARLY => 'yearly',
        };
    }
}
