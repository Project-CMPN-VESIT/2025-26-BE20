<?php

namespace App\Console\Commands;

use App\Features\Domains\Domains\Jobs\DispatchVerifyDomainJob;
use App\Features\Domains\Services\DomainService;
use Illuminate\Console\Command;

class ResolveDomainsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'domain:resolve-domains';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Trying to resolve all unresolved domains';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to resolve all unresolved domains');

        DispatchVerifyDomainJob::dispatch(new DomainService());

        $this->info('Attempt Completed');
    }
}
