<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Period;

class PeriodController extends ApiController
{
    public function index(Request $request)
    {
        $periods = Period::all();

        return $this->sendSuccessResponse('periods have been retrieved successfully', ['name' => 'periods', 'value' => $periods]);
    }
}
