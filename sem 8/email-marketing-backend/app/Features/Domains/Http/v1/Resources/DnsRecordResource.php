<?php

namespace App\Features\Domains\Http\v1\Resources;

use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use Spatie\LaravelData\Data;

class DnsRecordResource extends Data
{
    
    public function __construct(
       public string $type,
       public string $name,
       public string $value,
    ) { }

}

?>