<?php

use App\Features\Plans\Http\v1\Controllers\PlanController;
use Illuminate\Support\Facades\Route;

Route::get('/plans', [PlanController::class, 'getAllPlans']);

?>