<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommissionTechniciansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commission_technicians', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('technician_id');
            $table->foreign('technician_id')->references('id')->on('technicians')->onUpdate('cascade')->onDelete('cascade');
            $table->decimal('service', 4, 2)->default(0.0);
            $table->decimal('tip', 4, 2)->default(0.0);
            $table->date('start')->nullable();
            $table->date('end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commission_technicians');
    }
}
