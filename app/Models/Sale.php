<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = ['technician_id', 'date'];
    protected $hidden = ['created_at', 'updated_at'];

    public function saleItem()
    {
        return $this->hasMany(SaleItem::class);
    }
}
