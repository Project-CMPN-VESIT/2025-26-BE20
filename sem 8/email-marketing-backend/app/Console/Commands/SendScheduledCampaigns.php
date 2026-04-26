<?php

namespace App\Console\Commands;

use App\Features\Campaigns\Domains\Enums\CampaignStatusEnum;
use App\Features\Campaigns\Domains\Jobs\DispatchSendCampaignEmailJob;
use App\Features\Campaigns\Domains\Models\Campaign;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class SendScheduledCampaigns extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'campaign:send-scheduled-campaigns';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $campaigns = Campaign::where('status', '=' , CampaignStatusEnum::SCHEDULED)
                    ->where('send_at', '<=', Carbon::now('Asia/Kolkata'))
                    ->get();

        foreach($campaigns as $campaign) {
            dispatch(new DispatchSendCampaignEmailJob($campaign));
        }
    }
}
