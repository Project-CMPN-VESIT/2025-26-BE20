<?php

namespace App\Providers;

use App\Handlers\CustomExceptionHandler;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ExceptionHandler::class,CustomExceptionHandler::class);
    }

    /**
     * Setup to run migrations inside domains of features folders
     * 
     * Migrations should be in directory: app/Features/{FeatureName}/Domains/Migrations
     */
    public function boot(): void
    {
        $migrationPaths = collect(File::directories(base_path('app/Features')))
                            ->map(function ($featurePath) {
                                $migrationPath = $featurePath . '/Domains/Migrations';
                                return File::isDirectory($migrationPath) ? $migrationPath : null;
                            })
                            ->filter()
                            ->all();
        $this->loadMigrationsFrom($migrationPaths);

        RateLimiter::for('campaign-email-limit', function() {
            return Limit::perMinute(30);
        });
    }
}
