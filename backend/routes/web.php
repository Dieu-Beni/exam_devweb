<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
use Illuminate\Support\Facades\Mail;

Route::get('/test-mail', function () {
    Mail::raw('Ceci est un test avec Brevo !', function ($message) {
        $message->to('jinanonn43@gmail.com')
                ->subject('Test Brevo Laravel');
    });
    return '✅ Email envoyé avec Brevo !';
});
