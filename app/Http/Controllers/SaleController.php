<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Sale;
use App\Models\SaleItem;

class SaleController extends Controller
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

        $addedSale = Sale::create(['technician_id' => $request['technician_id'], 'date' => $request['date']]);

        if(isset($request['sales'])){
            foreach($request['sales'] as $sale){
                $saleItem = SaleItem::create(['sale_id' => $addedSale->id, 'item_id' => $sale['item_id'], 'amount' => $sale['amount']]);
            }
        }

        $response = ['sale_id' => $addedSale->id];

        return response()->json(['success' => true, 'message'=> 'technician sale is added', 'data' => $response ]);

        
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
    public function update(Request $request, $saleId)
    {
        $request['sale_id'] = $saleId;
        $validation = Validator::make($request->all(), [
            'sale_id' => 'required|exists:sales,id',
            'sales' => 'required'
        ]);

        if($validation->fails()){
            return response()->json(['error' => 'invalid inputs', 'message' => $validation->errors()]);
        }

        $addedSale = Sale::find($saleId)->makeHidden(['technician_id','date','note']);
        

        if(isset($request['sales'])){
            foreach($request['sales'] as $sale){
                $saleItem = SaleItem::where([['sale_id', '=', $saleId], ['item_id', '=', $sale['item_id']]]);
                $saleItem->update($sale);
            }
        }

        $response = ['sale_id' => $addedSale->id, 'sales' => $addedSale->saleItem->makeHidden('sale_id') ];

        return response()->json(['success' => true, 'message' => 'sales have been updated', 'data' => $response]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($saleId)
    {
        $request['sale_id'] = $saleId;
        $validation = Validator::make($request, [
            'sale_id' => 'required|exists:sales,id',
        ]);

        if($validation->fails()){
            return response()->json(['error' => 'invalid inputs', 'message' => $validation->errors()]);
        }

        $sale = Sale::find($saleId);

        $sale->delete();

        return response()->json(['success' => true, 'message' => 'sales have been deleted']);

    }
}
