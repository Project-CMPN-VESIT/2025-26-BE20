<?php

namespace App\Features\Domains\Domains\Enums;

use InvalidArgumentException;

enum DomainStatusEnum: int
{
    case RESOLVED = 0;
    case UNRESOLVED = 1;

    public static function fromString(string $value): self
    {
        return match(strtolower($value)) {
            'resolved' => self::RESOLVED,
            'unresolved' => self::UNRESOLVED,
            default => throw new InvalidArgumentException("Invalid user role: $value"),
        };
    }

    public function toString(): string
    {
        return match($this) {
            self::RESOLVED => 'resolved',
            self::UNRESOLVED => 'unresolved'
        };
    }
}
