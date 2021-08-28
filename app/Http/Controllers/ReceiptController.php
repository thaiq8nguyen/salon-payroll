<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Receipt;
use App\Models\ItemReceipt;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'technician_id' => 'required|exists:technicians,id',
            'date' => 'required',
        ]);

        if($validation->fails()){
            return response()->json(['error' => 'invalid inputs', 'message' => $validation->errors()]);
        }

        $addedReceipt = Receipt::create(['technician_id' => $request['technician_id'], 'date' => $request['date']]);

        if(isset($request['receipts'])){
            foreach($request['data'] as $sale){
                $saleItem = ItemReceipt::create(['sale_id' => $addedSale->id, 'item_id' => $sale['item_id'], 'amount' => $sale['amount']]);
            }
        }

        $response = ['receipt_id' => $addedReceipt->id];

        return response()->json(['success' => true, 'message'=> 'technician sale has been added', 'data' => $response ]);

        
    }

    public function storeAll(Request $request)
    {
        $technicians = [];
        foreach ($request['data'] as $technician) {
            $addedReceipt = Receipt::create(['technician_id' => $technician['technician_id'], 'date' => $request['date']]);

            array_push($technicians, ['technician_id' => $technician['technician_id'], 'receipt_id' => $addedReceipt->id]);
            foreach($technician['receipts'] as $receipt ){
                $receiptItem = ItemReceipt::create(['receipt_id' => $addedReceipt->id, 'item_id' => $receipt['item_id'], 'amount' => $receipt['amount']]);
            }
        }
        
        $response = ['date' => $request['date'], 'technicians' => $technicians];



        return response()->json(['success' => true, 'message' => 'receipts have been added', 'data' => $response],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $receiptId)
    {
        $request['receipt_id'] = $receiptId;
        $validation = Validator::make($request->all(), [
            'receipt_id' => 'required|exists:receipt,id',
            'data' => 'required'
        ]);

        if($validation->fails()){
            return response()->json(['error' => 'invalid inputs', 'message' => $validation->errors()]);
        }

        $addedReceipt = Receipt::find($receiptId)->makeHidden(['technician_id','date','note']);
        

        if(isset($request['data'])){
            foreach($request['data'] as $receiptItem){
                $item = ItemReceipt::where([['receipt_id', '=', $receiptId], ['item_id', '=', $receiptItem['item_id']]]);
                $item->update($sale);
            }
        }

        $response = ['receipt_id' => $addedReceipt->id, 'receipt' => $addedReceipt->receiptItem->makeHidden('receipt_id') ];

        return response()->json(['success' => true, 'message' => 'receipts have been updated', 'data' => $response]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($receiptId)
    {
        $request['receipt_id'] = $receiptId;
        $validation = Validator::make($request, [
            'receipt_id' => 'required|exists:receipts,id',
        ]);

        if($validation->fails()){
            return response()->json(['error' => 'invalid inputs', 'message' => $validation->errors()]);
        }

        $receipt = Receipt::find($receiptId);

        $receipt->delete();

        return response()->json(['success' => true, 'message' => 'receipts have been deleted']);

    }
}
