<?php

namespace App\Http\Controllers;

//use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Models\Technician;
use App\Http\Traits\ApiResponseTrait;

class TechnicianController extends Controller
{
    use ApiResponseTrait;

    public function create(Request $request)
    {
        $technician = Technician::create(['first_name' => $request['first_name'], 'last_name' => $request['last_name'], 'email' => $request['email'], 'phone_number' => $request['phone_number'], 'is_contractor' => $request['is_contractor'] ]);

        return response()->json($technician, 201);
    }

    public function read()
    {
        $technicians = Technician::all();

        return response()->json(['success' => true, 'message' => 'technicians have been retrieved successfully', 'data' => $technicians], 200);
    }

    public function update($id, Request $request)
    {
        $technician = Technician::find($id);

        $technician->update($request->all());

        return response()->json(Technician::find($id), 200);
    }

    public function delete($id)
    {
        $technician = Technician::find($id);

        $row = $technician->delete();

        return response()->json($row, 200);
    }
}
