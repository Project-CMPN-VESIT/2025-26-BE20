<?php

namespace App\Features\EmailLists\Domains\Enums;

enum ContactStatus:string
{   
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case PENDING = 'pending';
    case APPROVED = 'approved';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
