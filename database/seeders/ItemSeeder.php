<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([['name' => 'technician_sale', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],['name' => 'technician_tip', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]]);
    }
}
