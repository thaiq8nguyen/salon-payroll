<?php

namespace App\Http\Controllers;

//use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Models\Technician;

class TechnicianController extends ApiController
{
    public function create(Request $request)
    {
        $technician = Technician::create(['first_name' => $request['first_name'], 'last_name' => $request['last_name'], 'email' => $request['email'], 'phone_number' => $request['phone_number'], 'is_contractor' => $request['is_contractor'] ]);

        return response()->json($technician, 201);
    }

    public function read(Request $request)
    {
        $details = $request->query('details');

        if ($details === true) {
            $technicians = Technician::all();
        } else {
            $technicians = Technician::where('is_active', 1)->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')->get(['id', 'first_name', 'last_name']);
        }
        //$technicians = Technician::where('is_active', 1)->get(['id', 'first_name', 'last_name']);

        return $this->sendSuccessResponse('all active technicians have been retrieved successfully', ['name' => 'technicians', 'value' => $technicians]);
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
