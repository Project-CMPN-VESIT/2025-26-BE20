<?php

namespace App\Features\Domains\Domains\Jobs;

use App\Features\Domains\Domains\Jobs\VerifyDomainJob;
use App\Features\Domains\Domains\Models\Domain;
use App\Features\Domains\Services\DomainService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class DispatchVerifyDomainJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private DomainService $domainService
    ) { }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $domains = $this->domainService->getAllUnresolvedDomains();

        Domain::chunk(100, function() use($domains) {
            foreach($domains as $domain) {
                VerifyDomainJob::dispatch($domain);
            }
        });
    }
}
