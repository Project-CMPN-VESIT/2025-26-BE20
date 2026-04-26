<?php

namespace App\Features\EmailLists\Domains\Data;

use Spatie\LaravelData\Data;

class SearchContactData extends Data
{
    public function __construct(
        public string $value
    ) { }
}

?>