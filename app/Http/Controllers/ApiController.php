<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    use ApiResponseTrait;

    public function traitTest()
    {
        return $this->sendSuccessResponse();
        //return response()->json(['hello' => 'world']);
    }
}
