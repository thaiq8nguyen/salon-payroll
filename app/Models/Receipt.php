<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = ['technician_id', 'date'];
    protected $hidden = ['created_at', 'updated_at'];

    public function items()
    {
        return $this->belongsToMany(Item::class)->as('item_detail')->withPivot('amount')->withTimestamps();
        //return $this->belongsToMany(Item::class)->withPivot('amount')->withTimestamps();
    }

    public function technician()
    {
        return $this->belongTo(Tehcnician::class);
    }
}
