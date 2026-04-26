<?php

namespace App\Features\Campaigns\Domains\Enums;

use InvalidArgumentException;

enum CampaignStatusEnum: int
{
    case SCHEDULED = 0;
    case ONGOING = 1;
    case COMPLETED = 2;
    case DRAFT = 3;

    public static function fromString($value): self
    {
        return match(strtolower($value)) {
            'scheduled' => self::SCHEDULED,
            'ongoing' => self::ONGOING,
            'completed' => self::COMPLETED,
            'draft' => self::DRAFT,
            default => throw new InvalidArgumentException("Invalid campaign status: $value")
        };
    }

    public function toString(): string
    {
        return match($this) {
            self::SCHEDULED => 'scheduled',
            self::ONGOING => 'ongoing',
            self::COMPLETED => 'completed',
            self::DRAFT => 'draft'
        };
    }
}
