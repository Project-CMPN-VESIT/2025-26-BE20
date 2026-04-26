<?php

namespace App\Features\Campaigns\Domains\Rules;

use Closure;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class ExistsInEither implements Rule
{
    protected $table1;
    protected $table2;
    protected $column;

    /**
     * ExistsInEither Constructor
     *
     * @param [type] $table1
     * @param [type] $table2
     * @param string $column
     */
    public function __construct($table1, $table2, $column = 'id')
    {
        $this->table1 = $table1;
        $this->table2 = $table2;
        $this->column = $column;
    }

    /**
     * Method validating whether the value is present in the specified column of the given tables
     *
     * @param [type] $attribute
     * @param [type] $value
     * @return boolean
     */
    public function passes($attribute, $value): bool
    {
        return DB::table($this->table1)->where($this->column, $value)->exists()
            || DB::table($this->table2)->where($this->column, $value)->exists();
    }

    /**
     * Returning a user friendly message
     *
     * @return string
     */
    public function message(): string
    {
        return 'Email Template not found.';
    }
}
