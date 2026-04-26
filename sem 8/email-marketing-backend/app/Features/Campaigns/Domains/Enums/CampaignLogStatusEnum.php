<?php

namespace App\Features\Campaigns\Domains\Enums;

use InvalidArgumentException;

enum CampaignLogStatusEnum: int
{
    case PENDING = 0;
    case SENT = 1;
    case FAILED = 2;

    public static function fromString($value): self
    {
        return match(strtolower($value)) {
            'pending' => self::PENDING,
            'sent' => self::SENT,
            'failed' => self::FAILED,
            default => throw new InvalidArgumentException("Invalid campaign status: $value")
        };
    }

    public function toString(): string
    {
        return match($this) {
            self::PENDING => 'pending',
            self::SENT => 'sent',
            self::FAILED => 'failed'
        };
    }
}
