<?php

namespace App\Features\Domains\Domains\Enums;


enum DnsRecordEnum: string
{
    case CNAME = 'CNAME';
    case TXT = 'TXT';
    case TXT_VERIFICATION = 'TXT (Verification)';

}
