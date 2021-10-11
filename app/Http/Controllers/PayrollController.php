<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Technician;
use App\Models\Receipt;
use App\Models\Item;

class PayrollController extends ApiController
{
    public function getReceipts($periodId)
    {
        $receipts = Receipt::with('items')->whereBetween('date', ['2021-08-29','2021-09-13'])->orderBy('date', 'asc')->get()->groupBy('date');

        $response = collect();

        foreach ($receipts as $date => $technicians) {
            $response->push(['date' => $date, 'technicians' => $this->formatTechnicians($technicians) ]);
        }
        
        return $this->sendSuccessResponse('receipts in the payroll period have been retrieved', ['name' => 'receipts', 'value' => $response]);
    }
   
    public function getTotalReceiptsAmount($periodId)
    {
        $receipts = Receipt::with('items')->whereBetween('date', ['2021-08-29','2021-09-13'])->orderBy('date', 'asc')->get()->groupBy('technician_id');

        

        $response = collect();

        foreach ($receipts as $technician_id => $receipts) {
            $response->push(['technician_id' => $technician_id, 'items' => $this->sumItems($receipts)]);
        }

        return $this->sendSuccessResponse('receipt retrieved', ['name' => 'receipts', 'value' => $response]);
    }

    private function sumItems($receipts)
    {
        $items = $receipts->pluck('items');
    
        $itemWithAmounts = $items->map(function ($item) {
            return $item->pluck('item_detail.amount', 'name');
        });
        
        $saleResult = [['name' => 'sale_receipt','total_amount' => $itemWithAmounts->sum('sale_receipt')],['name' => 'tip_receipt', 'total_amount' => $itemWithAmounts->sum('tip_receipt') ]];
        return $saleResult;
    }
    private function formatTechnicians($technicians)
    {
        $formatted = $technicians->map(function ($technician) {
            return ['receipt_id' => $technician->id, 'technician_id' => $technician->technician_id, 'items' => $this->formatItems($technician->items) ];
        });

        return $formatted;
    }
    private function formatItems($items)
    {
        $formatted = $items->map(function ($item) {
            return ['name' => $item->name, 'amount' => $item->item_detail->amount];
        });

        return $formatted;
    }
}
