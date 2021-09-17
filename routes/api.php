<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::post('/technicians', [TechnicianController::class, 'create']);
//Route::get('/technicians', [TechnicianController::class, 'read']);
Route::put('/technicians/{id}', [TechnicianController::class, 'update']);
Route::delete('/technicians/{id}', [TechnicianController::class, 'delete']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/technicians', [TechnicianController::class, 'read']);
    Route::get('/user', [AuthController::class, 'user']);

    //Single processing
    Route::post('/receipts', [ReceiptController::class, 'create']);
    Route::get('/technicians/receipts', [ReceiptController::class, 'show']);
    Route::put('/receipts', [ReceiptController::class, 'edit']);
    Route::delete('/receipts', [ReceiptController::class, 'destroy']);

    //Bulk processing
    Route::post('/receipts/bulk', [ReceiptController::class, 'createMany']);
    
    Route::resource('items', ItemController::class);
});

Route::get('/trait-test', [ApiController::class, 'traitTest']);
