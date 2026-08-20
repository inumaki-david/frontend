<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "Hello, World!";
});

Route::get("/ping", function(){
    return response()->json(["message" => "ping! Api funcionando"], 200);
});