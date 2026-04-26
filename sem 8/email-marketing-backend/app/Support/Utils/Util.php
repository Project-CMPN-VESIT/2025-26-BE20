<?php

namespace App\Support\Utils;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class Util
{
    public static function paginate(Collection $collection, int $perPage = 10): LengthAwarePaginator
    {
        $perPage = $perPage == 0 ? 10 : $perPage;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentPageItems = $collection
                            ->slice(($currentPage - 1) * $perPage, $perPage)
                            ->values();
        $paginator = new LengthAwarePaginator(
            $currentPageItems,
            $collection->count(),
            $perPage,
            $currentPage,
            [
                'path' => request()->url(),
                'query' => request()->query()
            ]
        );
        return $paginator;
    }
}

?>