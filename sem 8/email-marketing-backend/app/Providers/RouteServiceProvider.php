<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function(Request $request) {
            return Limit::perMinute(60)->by($request->user()->id ?: $request->ip());
        });

        $this->routes(function() {
            Route::middleware('api')
                    ->prefix('api')
                    ->group(base_path('routes/api.php'));
        });
    }

    public static function loadVersionedRoutes(string $version): void
    {
        $routePaths = collect(File::directories(base_path('app/Features')))
                        ->map(function ($featurePath) use ($version) {
                            $routePath = $featurePath . "/Http/{$version}/Routes";
                            return File::isDirectory($routePath) ? $routePath : null;
                        })
                        ->filter();

        $routePaths->map(function($routePath) use ($version) {
            if(File::isDirectory($routePath)) {
                $files = File::files($routePath);

                foreach($files as $file) {
                    Route::prefix($version)
                            ->middleware('api')
                            ->group($file->getPathname());
                }
            }
        });
    }
}
