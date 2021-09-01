<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technician extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'email', 'phone_number', 'is_active', 'is_contractor', 'is_admin'];
    protected $hidden = ['user_id','created_at', 'updated_at'];
}
