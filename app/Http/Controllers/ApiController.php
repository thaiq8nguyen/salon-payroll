<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;

class ApiController extends Controller
{
    protected function sendSuccessResponse($message, $data='', $code=200)
    {
        $response = [
            'success' =>  true,
            'message' => $message,
            $data['name'] => $data['value']
        ];
        return response()->json($response, $code);
    }
}
