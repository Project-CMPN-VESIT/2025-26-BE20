<?php

namespace App\Providers;

use App\Features\Users\Domains\Models\Organization;
use App\Features\Users\Domains\Models\Settings;
use App\Features\Users\Domains\Models\User;
use App\Features\Users\Domains\Observers\OrganizationObserver;
use App\Features\Users\Domains\Observers\SettingsObserver;
use App\Features\Users\Domains\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;

class ObserverProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        User::observe(UserObserver::class);
        Settings::observe(SettingsObserver::class);
    }
}
