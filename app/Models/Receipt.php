<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = ['technician_id', 'date'];
    protected $hidden = ['created_at', 'updated_at'];

    public function receiptItem()
    {
        return $this->hasMany(ItemReceipt::class);
    }
}
