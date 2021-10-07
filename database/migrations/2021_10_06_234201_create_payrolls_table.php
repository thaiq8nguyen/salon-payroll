<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayrollsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('technician_id');
            $table->foreign('technician_id')->references('id')->on('technicians')->onUpdate('cascade')->onDelete('cascade');
            $table->bigInteger('period_id');
            $table->foreign('period_id')->references('id')->on('periods')->onUpdate('cascade')->onDelete('cascade');
            $table->date('date');
            $table->text('note');
            $table->decimal('total_amount', 10, 2)->nullable();
            $table->text('report');
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
        Schema::dropIfExists('payrolls');
    }
}
