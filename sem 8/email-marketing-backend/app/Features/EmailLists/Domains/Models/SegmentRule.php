<?php

namespace App\Features\EmailLists\Domains\Models;

use App\Support\Models\BaseModel;
use Illuminate\Support\Collection;

class SegmentRule extends BaseModel
{

    public function segment()
    {
        return $this->belongsTo(Segment::class);
    }

    public function getSegmentRulesBySegmentId(string $id): Collection
    {
        $segmentRules = $this->where('segment_id', $id)->get();
        return $segmentRules;
    }
}
