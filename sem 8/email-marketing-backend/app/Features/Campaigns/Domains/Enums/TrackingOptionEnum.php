<?php

namespace App\Features\Campaigns\Domains\Enums;

use InvalidArgumentException;

enum TrackingOptionEnum: int
{
    case OPEN = 0;
    case CLICK = 1;
    case BOUNCE = 2;
    case UNSUBSCRIBE = 3;
    case SPAM = 4;

    public static function fromString($value): self
    {
        return match(strtolower($value)) {
            'open' => self::OPEN,
            'click' => self::CLICK,
            'bounce' => self::BOUNCE,
            'unsubscribe' => self::UNSUBSCRIBE,
            'spam' => self::SPAM,
            default => throw new InvalidArgumentException("Invalid tracking option: $value")
        };
    }

    public function toString(): string
    {
        return match($this) {
            self::OPEN => 'open',
            self::CLICK => 'click',
            self::BOUNCE => 'bounce',
            self::UNSUBSCRIBE => 'unsubscribe',
            self::SPAM => 'spam'
        };
    }
}
