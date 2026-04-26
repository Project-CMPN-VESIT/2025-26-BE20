<?php

namespace App\Features\Campaigns\Domains\Rules;

use App\Features\Domains\Domains\Enums\DomainStatusEnum;
use Closure;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class CheckDomainAuthentication implements Rule
{
    /**
     * Checking whether the domain provided by the user is authenticated or not
     *
     * @param [type] $attribute
     * @param [type] $value
     * @return boolean
     */
    public function passes($attribute, $value): bool
    {
        $organization_id = auth('api')->user()->organization_id;
        $mail_domain = explode('@', $value)[1];
        $domain = DB::table('domains')
                ->where('organization_id', '=', $organization_id)
                ->where('domain_name', '=', $mail_domain)
                ->first();
        if(!$domain) return false;
        if($domain->status == DomainStatusEnum::UNRESOLVED) return false;
        return true;
    }

    /**
     * Returning a user friendly message
     *
     * @return string
     */
    public function message(): string
    {
        return "The provided domain is not authenticated.";
    }
}
