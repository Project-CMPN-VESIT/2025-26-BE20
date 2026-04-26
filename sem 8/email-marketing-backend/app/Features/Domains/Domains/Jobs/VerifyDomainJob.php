<?php

namespace App\Features\Domains\Domains\Jobs;

use App\Features\Domains\Domains\Enums\DnsRecordEnum;
use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use App\Features\Domains\Domains\Models\DnsRecord;
use App\Features\Domains\Domains\Models\Domain;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Queue\Queueable;

class VerifyDomainJob implements ShouldQueue
{
    use Queueable;
    
    public int $tries = 5;
    public array $backoff = [300, 900, 1800];

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Domain $domain
    ) { }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $results = $this->verifyDomain($this->domain);
        if(empty($results)) {
            $this->domain->status = DomainStatusEnum::RESOLVED;
            $this->domain->verification_errors = null;
            $this->domain->verification_failed_at = null;
            $this->domain->save();
        } else {
            $formatted_result = [];

            foreach($results as $keyType => $value) {
                $formatted_result[$keyType] = [
                    'code' => $value['code'],
                    'message' => $value['message']
                ];
            }
        $formatted_result = json_encode($formatted_result);
            $this->domain->status = DomainStatusEnum::UNRESOLVED;
            $this->domain->verification_errors = $results;
            $this->domain->verification_failed_at = Carbon::now('Asia/Kolkata');
            $this->domain->save();
        }
    }

    /**
     * Verifying by checking TXT for domain
     *
     * @param [type] $domain
     * @return boolean
     */
    public function verifyDomain(Domain $domain): array
    {
        $dnsRecords = DnsRecord::where('domain_id', $domain->id);

        $results = [
            'dkim' => $this->verifyDkim($domain, (clone $dnsRecords)),
            'spf'  => $this->verifySpf($domain, (clone $dnsRecords)),
            'txt'  => $this->verifyDomainTxt($domain, clone $dnsRecords),
        ];
        
        $results = array_filter($results, function ($result) { return !($result['status'] === 'valid'); });

        return $results;
    }

    private function verifyDkim(Domain $domain, Builder $dnsRecords): array
    {
        $name = 'itsrv.domainkey.' . $domain->domain_name;
        $expectedTarget = $dnsRecords
                            ->where('type', DnsRecordEnum::CNAME)
                            ->first()
                            ->value;

        $records = dns_get_record($name, DNS_CNAME);

        if (empty($records)) {
            return $this->fail(
                'DKIM_NOT_FOUND',
                'DomainKeys/DKIM records were not found. Make sure you have added them.'
            );
        }

        if (count($records) > 1) {
            return $this->fail(
                'DKIM_MULTIPLE_RECORDS',
                'Multiple DKIM records were found. Remove conflicting entries.'
            );
        }

        if (strtolower(rtrim($records[0]['target'], '.')) !== $expectedTarget) {
            return $this->fail(
                'DKIM_VALUE_MISMATCH',
                'DomainKeys/DKIM record exists but does not match the expected value.'
            );
        }

        return $this->success();
    }

    private function verifySpf(Domain $domain, Builder $dnsRecords): array
    {
        $records = dns_get_record($domain->domain_name, DNS_TXT);

        $spfRecords = array_filter($records, fn ($r) =>
            isset($r['txt']) && str_starts_with($r['txt'], 'v=spf1')
        );

        if (empty($spfRecords)) {
            return $this->fail(
                'SPF_NOT_FOUND',
                'SenderID/SPF record was not found.'
            );
        }

        if (count($spfRecords) > 1) {
            return $this->fail(
                'SPF_MULTIPLE_RECORDS',
                'Multiple SPF records were found. Merge them into one.'
            );
        }

        $spf = strtolower($spfRecords[array_key_first($spfRecords)]['txt']);
        
        $expectedRecordValue = $dnsRecords
                                ->where('type', DnsRecordEnum::TXT)
                                ->first()
                                ->value;


        
        $required = explode(' ', $expectedRecordValue);

        foreach ($required as $token) {
            if (!str_contains(strtolower($spf), $token)) {
                return $this->fail(
                    'SPF_MISMATCH',
                    "SPF record is missing required mechanism: {$token}/ SenderID/SPF records do not include our sending domain."
                );
            }
        }

        return $this->success();
    }

    private function verifyDomainTxt(Domain $domain, Builder $dnsRecords): array
    {
        $expectedRecordValue = $dnsRecords
                            ->where('type', DnsRecordEnum::TXT_VERIFICATION)
                            ->first()
                            ->value;

        $records = dns_get_record($domain->domain_name, DNS_TXT);
        
        foreach ($records as $record) {
            $txt = $record['txt']
                ?? implode('', $record['entries'] ?? []);
            if (trim($txt) == $expectedRecordValue) {
                return $this->success();
            }
        }
        
        return $this->fail(
            'DOMAIN_TXT_NOT_FOUND',
            'Domain verification TXT record was not found. Make sure you have added it.'
        );
    }


    private function success(): array
    {
        return [
            'status' => 'valid',
            'code' => 'VALID',
            'message' => null,
        ];
    }

    private function fail(string $code, string $message): array
    {
        return [
            'status' => 'invalid',
            'code' => $code,
            'message' => $message,
        ];
    }

}
