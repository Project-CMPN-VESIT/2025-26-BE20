<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class UploadPredefinedTemplatesToR2 extends Command
{
    /**
     * The name and signature of the console command.
     * 
     * @var string
     */
    protected $signature = 'templates:upload-predefined-templates-to-r2';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Upload Predefined templates to R2 Storage';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $localBase = resource_path('templates');
        $r2Base = 'predefined';

        foreach (scandir($localBase) as $folder) {
            if (in_array($folder, ['.', '..'])) continue;

            $localPath = "{$localBase}/{$folder}";
            if (!is_dir($localPath)) continue;

            $this->info("Processing folder: {$folder}");

            foreach (scandir($localPath) as $file) {
                if (in_array($file, ['.', '..'])) continue;

                $r2FilePath = "{$r2Base}/{$folder}/{$file}";

                // Skip if already exists
                if (Storage::disk('r2')->exists($r2FilePath)) {
                    $this->line("✔ Already exists: {$file}");
                    continue;
                }

                // Upload with original filename
                Storage::disk('r2')->putFileAs(
                    "{$r2Base}/{$folder}",
                    new File("{$localPath}/{$file}"),
                    $file
                );
            }
        }

        $this->info('All templates processed.');
    }
}

