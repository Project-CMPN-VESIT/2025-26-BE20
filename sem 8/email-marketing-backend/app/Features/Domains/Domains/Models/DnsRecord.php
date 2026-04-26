<?php

namespace App\Features\Domains\Domains\Models;

use App\Features\Domains\Domains\Data\CreateDomainData;
use App\Features\Domains\Domains\Data\DnsRecordData;
use App\Features\Domains\Domains\Data\UpdateDomainData;
use App\Features\Domains\Domains\Enums\DnsRecordEnum;
use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use App\Support\Models\BaseModel;

class DnsRecord extends BaseModel
{
    public function createDnsRecord(Domain $domain,DnsRecordEnum $type, string $name, string $value): self
    {
        return self::create([
            "domain_id" => $domain->id,
            "type" => $type->value,
            "name" => $name,
            "value" => $value,
        ]);
    }

    public function getRecordsByDomainId(Domain $domain) {
        return self::where('domain_id', '=', $domain->id)->get();
    }

    public function domain()
    {
        return $this->belongsTo(Domain::class);
    }
}
