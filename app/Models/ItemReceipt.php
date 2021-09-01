<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemReceipt extends Model
{
    use HasFactory;

    protected $fillable = ['receipt_id','item_id','amount'];
    protected $table = 'item_receipt';

    public function items()
    {
        return $this->belongTo(Item::class);
    }
}
