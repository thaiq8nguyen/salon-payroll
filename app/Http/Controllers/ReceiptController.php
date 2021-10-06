<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Receipt;
use App\Models\Technician;
use App\Models\ItemReceipt;

class ReceiptController extends ApiController
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
    }

    
    public function create(Request $request)
    {
        // $validation = Validator::make($request->all(), [
        //     'technician_id' => 'required|exists:technicians,id',
        //     'date' => 'required',
        // ]);

        // if ($validation->fails()) {
        //     return response()->json(['error' => 'invalid inputs', 'message' => $validation->errors()]);
        // }

        $newReceipt = Receipt::create(['technician_id' => $receipt['technician_id'], 'date' => $receipt['date']]);
        foreach ($receipt['items'] as $item) {
            $newItem = $newReceipt->items()->attach($item['item_id'], ['amount' => $item['amount']]);
        }

        $response =['receipt_id' => $newReceipt->id];

        return response()->json(['success' => true, 'message' => 'receipt has been created', 'receipt' => $response]);
    }

    public function createMany(Request $request)
    {
        $response = [];
        foreach ($request['receipts'] as $receipt) {
            $newReceipt = Receipt::create(['technician_id' => $receipt['technician_id'], 'date' => $receipt['date']]);
            foreach ($receipt['items'] as $item) {
                $newItem = $newReceipt->items()->attach($item['item_id'], ['amount' => $item['amount']]);
            }
            $receiptResponse = ['technician_id' => $receipt['technician_id'],'receipt_id' => $newReceipt->id];
            array_push($response, $receiptResponse);
        }
        

        return response()->json(['success' => true, 'message'=> 'technician receipt have been added', 'data' => $response ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $response = '';
        //$date = $request->input('date');
        if ($request->has('date')) {
            $date = $request->input('date');
            
            if ($request->has('with-receipts')) {
                $withReceipts = $request->input('with-receipts');
                if ($withReceipts === 'yes') {
                    $techniciansWithReceipt = Technician::with(['receipt' => function ($query) use ($date) {
                        $query->where('date', $date);
                    }])->whereHas('receipts', function ($query) use ($date) {
                        $query->where('date', $date);
                    })->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')->get()->toArray();
                    $response = $this->formatTechniciansWithReceipt($techniciansWithReceipt);
                //$response = $techniciansWithReceipt;
                } else {
                    $receipts = Technician::whereDoesntHave('receipts', function ($query) use ($date) {
                        $query->where('date', $date);
                    })->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')->get()->toArray();
                    $response = $this->formatTechniciansWithoutReceipt($receipts);
                }
            }
        }

        return $this->sendSuccessResponse($response['message'], ['name' => 'technicians', 'value' => $response['data']]);
        //return $this->sendSuccessResponse('test', ['name' => 'technicians', 'value' => $response]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $response = [];
        foreach ($request['receipts'] as $receipt) {
            $currentReceipt = Receipt::find($receipt['receipt_id']);
            
            foreach ($receipt['items'] as $item) {
                $editedItem = $currentReceipt->items()->updateExistingPivot($item['item_id'], ['amount' => $item['amount']]);
            }
            array_push($response, ['receipt_id' => $currentReceipt->id, 'items' => $this->formatItems($currentReceipt->items()->get()->toArray())]);
        }
        
        
        return response()->json(['success' => true, 'message' => 'receipts have been updated', 'data' => $response]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $response = [];
        foreach ($request['receipts'] as $receipt) {
            $currentReceipt = Receipt::find($receipt['receipt_id']);
            //$result = $receipt->delete();
            $currentReceipt->items()->detach();
            $currentReceipt->delete();
            array_push($response, ["receipt_id" => $receipt['receipt_id']]);
        }
        
        return response()->json(['success' => true, 'message' => 'receipts have been deleted', 'data' => $response]);
        //return response()->json(['data' => $request->all()]);
    }

    private function formatItems($items)
    {
        $result = array_map(function ($item) {
            $result = ['item_id' => $item['id'], 'name' => $item['name'], 'amount' => $item['item_detail']['amount']];
            return $result;
        }, $items);

        return $result;
    }

    private function formatTechniciansWithReceipt($technicians)
    {
        $result = [];
        if (count($technicians) > 0) {
            $data = array_map(function ($technician) {
                $result = ['technician_id' => $technician['id'], 'first_name' => $technician['first_name'], 'last_name' => $technician['last_name'], 'receipt_id' => $technician['receipt']['id'], 'receipt_date' => $technician['receipt']['date']];
                return $result;
            }, $technicians);

            $result = ['message' => 'technicians with receipt have been retrieved successfully', 'data' => $data];
        } else {
            $result = ['message' => 'no technicians with receipts on this date', 'data' => []];
        }
        
        return $result;
    }

    private function formatTechniciansWithoutReceipt($technicians)
    {
        $result = [];
        if (count($technicians) > 0) {
            $data = array_map(function ($technician) {
                $result = ['technician_id' => $technician['id'], 'first_name' => $technician['first_name'], 'last_name' => $technician['last_name']];
                return $result;
            }, $technicians);
            $result = ['message' => 'technicians with receipt have been retrieved successfully', 'data' => $data];
        } else {
            $result = ['message' => 'no technicians without receipts on this date', 'data' => []];
        }

        return $result;
    }
}
