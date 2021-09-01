<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Receipt;
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

    
    public function store(Request $request, $technician_id = null)
    {
        // $validation = Validator::make($request->all(), [
        //     'technician_id' => 'required|exists:technicians,id',
        //     'date' => 'required',
        // ]);

        // if ($validation->fails()) {
        //     return response()->json(['error' => 'invalid inputs', 'message' => $validation->errors()]);
        // }

        

        
        foreach ($request['receipts'] as $receipt) {
            $newReceipt = Receipt::create(['technician_id' => $receipt['technician_id'], 'date' => $receipt['date']]);
            foreach ($receipt['items'] as $item) {
                $newItem = $newReceipt->items()->attach($item['item_id'], ['amount' => $item['amount']]);
            }
        }
        $response = ['receipt_id' => $newReceipt->id];

        return response()->json(['success' => true, 'message'=> 'technician receipt have been added', 'data' => $response ]);
    }

    public function storeAll(Request $request)
    {
        $technicians = [];
        foreach ($request['data'] as $technician) {
            $addedReceipt = Receipt::create(['technician_id' => $technician['technician_id'], 'date' => $request['date']]);

            array_push($technicians, ['technician_id' => $technician['technician_id'], 'receipt_id' => $addedReceipt->id]);
            foreach ($technician['receipts'] as $receipt) {
                $receiptItem = ItemReceipt::create(['receipt_id' => $addedReceipt->id, 'item_id' => $receipt['item_id'], 'amount' => $receipt['amount']]);
            }
        }
        
        $response = ['date' => $request['date'], 'technicians' => $technicians];



        return $this->successResponse('receipts have been added', $response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id = null, Request $request)
    {
        if ($id) {
            $receipts = Receipt::with('items')->where('id', $id)->get()->toArray();
        } else {
            $date = $request->query('date');

            $receipts = Receipt::with('items')->where('date', $date)->get()->toArray();

            $response = array_map(
                function ($receipt) {
                    $result = ['receipt_id' => $receipt['id'], 'technician_id' => $receipt['technician_id'], 'date' => $receipt['date'],
                'items' =>
                    $this->formatItems($receipt['items']),
                    
                ];

                    return $result;
                },
                $receipts
            );
        }

        
        return response()->json(['success' => true, 'message' => 'receipts have been retrieved successfully', 'data' => $response], 200);
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
        // $request['receipt_id'] = $receiptId;
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
