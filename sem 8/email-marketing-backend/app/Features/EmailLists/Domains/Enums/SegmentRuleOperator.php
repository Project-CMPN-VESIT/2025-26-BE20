<?php

namespace App\Features\EmailLists\Domains\Enums;

enum SegmentRuleOperator:string
{
    case EQUALS = 'EQUALS';
    case NOT_EQUALS = 'NOT_EQUALS';
    case CONTAINS = 'CONTAINS';
    case NOT_CONTAINS = 'NOT_CONTAINS';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}