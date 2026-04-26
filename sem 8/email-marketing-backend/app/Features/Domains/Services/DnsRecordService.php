<?php

namespace App\Features\Domains\Services;

use App\Features\Domains\Domains\Enums\DnsRecordEnum;
use App\Features\Domains\Domains\Models\DnsRecord;
use App\Features\Domains\Domains\Models\Domain;
use Illuminate\Database\Eloquent\Collection;

class DnsRecordService 
{
    
    public function __construct(
        private DnsRecord $dnsRecord) 
    { }

    public function createDnsRecordsForDomain(Domain $domain): void
    {
        $this->createCnameRecord($domain);
        $this->createTxtRecord($domain);
        $this->createTxtVerificationRecord($domain);
    }

    public function getDnsRecordsByDomain(Domain $domain): Collection {
        return $this->dnsRecord->getRecordsByDomainId($domain);
    }
    
    private function createCnameRecord(Domain $domain) {
        $id = '';
        $type = DnsRecordEnum::CNAME;
        $name =  'itsrv.domainkey';
        $value = 'itsrv.domainkey.mailedit.live';

        $this->dnsRecord->createDnsRecord($domain, $type, $name, $value);
    }
  
    private function createTxtRecord(Domain $domain) {
        $id = '';
        $type = DnsRecordEnum::TXT;
        $name = '@';
        $value = 'v=spf1 include:mailedit.live ip4:85.215.211.40 ~all';
        $this->dnsRecord->createDnsRecord($domain, $type, $name, $value);
    }

    private function createTxtVerificationRecord(Domain $domain) {
        $id = '';
        $type = DnsRecordEnum::TXT_VERIFICATION;
        $name = '@';
        $salt = 16;
        $hash = hash_hmac("sha256",$domain->id, $salt);
        $value = "MailedIt-domain-verification=$hash";
        $this->dnsRecord->createDnsRecord($domain, $type, $name, $value);
    }
}

?>