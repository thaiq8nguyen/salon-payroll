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
        if ($request->has('date')) {
            $date = $request->input('date');
            if ($request->has('with-receipts')) {
                if ($request->input('with-receipts') === true) {
                } else {
                    $receipts = Technician::whereDoesntHave('receipts', function ($query) use ($date) {
                        $query->where('date', $date);
                    })->orderBy('last_name', 'asc')->orderBy('first_name', 'asc')->get(['id as technician_id','first_name']);
                    $response = $receipts;
                }
            }
        }

        

        //$receipts = Technician::with('items')->where('date', $date)->get()->toArray();
        //$receipts = Technician::with(['receipts:technician_id'])->where('first_name', 'Peter')->get();
        // $receipts = Technician::with(['receipts' => function ($query) use ($date) {
        //     $query->where('date', $date);
        // }, 'receipts.items'])->get()->toArray();

        // $receipts = Receipt::with(['items'])->where('date', $date)->get()->toArray();

        // $response = array_map(
        //     function ($receipt) {
        //         $result = ['receipt_id' => $receipt['id'], 'technician_id' => $receipt['technician_id'], 'date' => $receipt['date'],
        //     'items' =>
        //         $this->formatItems($receipt['items']),
                    
        //     ];

        //         return $result;
        //     },
        //     $receipts
        // );

        
        

        
        // return response()->json(['success' => true, 'message' => 'receipts have been retrieved successfully', 'data' => $response], 200);
        return $this->sendSuccessResponse('technicians with no receipt have been retrieved successfully', ['name' => 'technicians', 'value' => $response]);
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
        //$request['receipt_id'] = $receiptId;
        // $validation = Validator::make($request, [
        //     'receipt_id' => 'required|exists:receipts,id',
        // ]);

        // if ($validation->fails()) {
        //     return response()->json(['error' => 'invalid inputs', 'message' => $validation->errors()]);
        // }
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
}
