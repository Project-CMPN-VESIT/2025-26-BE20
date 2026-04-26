<?php

namespace App\Features\Plans\Domains\Data;

use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class SubscriptionData extends Data
{
    public function __construct(
        public ?string $plan_id,
        public ?Carbon $start_date,
        public ?Carbon $end_date,
        public ?Carbon $trial_ends_at
    ) { 
        $this->plan_id = '01978c58-ed4f-736c-8ebb-4d62a11487cb';
        $this->start_date = Carbon::now('Asia/Kolkata');
        $this->end_date = Carbon::now('Asia/Kolkata')->addDays(30);
        $this->trial_ends_at = Carbon::now('Asia/Kolkata')->addDays(30);
    }

    public static function rules(): array
    {
        return [
            'plan_id' => ['nullable', 'uuid'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
            'trial_ends_at' => ['nullable', 'date']
        ];
    }
}

?>