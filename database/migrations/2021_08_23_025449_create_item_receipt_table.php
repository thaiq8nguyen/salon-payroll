<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemReceiptTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_receipt', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('receipt_id')->nullable();
            $table->bigInteger('item_id')->nullable();
            $table->foreign('receipt_id')->references('id')->on('receipts')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('item_id')->references('id')->on('items')->onUpdate('cascade');
            $table->decimal('amount', 10,2)->default(0.0);
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
        Schema::dropIfExists('item_receipt');
    }
}
