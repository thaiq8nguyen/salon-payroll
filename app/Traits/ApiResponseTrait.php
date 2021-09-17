<?php

namespace App\Traits;

trait ApiResponseTrait
{
    //$message='', $data, $httpCode=200
    public function successReponse()
    {
        //$response = ['success' => true, 'message' => $message, 'data' => $data];

        return response()->json(['hello' => 'world']);
    }

    // protected function sendErrorResponse($message='', $error, $httpCode=404)
    // {
    //     $response = ['success' => false, 'message' => $message, 'data' => null];

    //     return response()->json($response, $httpCode);
    // }
}
