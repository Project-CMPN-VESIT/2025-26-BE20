<?php

namespace App\Features\EmailTemplates\Services;

use Illuminate\Support\Facades\Storage;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Str;

class ThumbnailService
{
    public function __construct() {}

    public function generateThumbnail(string $html, string $name): string
    {
        $filename = Str::slug($name) . '-' . now()->timestamp . '.png';
        $localPath = storage_path("app/tmp/{$filename}");
        $r2Path = "thumbnails/{$filename}";

        if(!is_dir(dirname($localPath))){
            mkdir(dirname($localPath),0755,true);
        }


        Browsershot::html($html)
            ->windowSize(1920, 800)
            ->fullPage()
            ->addChromiumArguments(['no-sandbox', 'disable-setuid-sandbox'])
            ->save($localPath); // Browsershot can only capture screenshots from localdisks

        Storage::disk('r2')->put($r2Path,file_get_contents($localPath),'public');

        unlink($localPath);
        return Storage::disk('r2')->url($r2Path);
    }
}
