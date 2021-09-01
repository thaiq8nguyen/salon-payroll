<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    protected $hidden =['created_at', 'updated_at'];

    public function receipts()
    {
        return $this->belongsToMany(Receipt::class);
    }
}
