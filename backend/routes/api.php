<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\Panier_produitController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ImageController;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::get('users', [UserController::class, 'index'])->middleware('auth:sanctum');
//Route::post('users', [UserController::class, 'store'])->middleware('auth:sanctum');
//Route::delete('users/{id}', [UserController::class, 'destroy'])->middleware('auth:sanctum');

Route::apiResource('users', UserController::class);//->middleware('auth:sanctum');
Route::apiResource('paniers', PanierController::class);//->middleware('auth:sanctum');
Route::apiResource('commandes', CommandeController::class);//->middleware('auth:sanctum');
Route::apiResource('notifications', NotificationController::class);//->middleware('auth:sanctum');
Route::apiResource('categories', CategorieController::class);//->middleware('auth:sanctum');
Route::apiResource('factures', FactureController::class);//->middleware('auth:sanctum');
Route::apiResource('paiements', PaiementController::class);//->middleware('auth:sanctum');
Route::apiResource('produits', ProduitController::class);//->middleware('auth:sanctum');
Route::apiResource('panier_produits', Panier_produitController::class);//->middleware('auth:sanctum');
Route::apiResource('articles', ArticleController::class);//->middleware('auth:sanctum');
Route::apiResource('images', ImageController::class);//->middleware('auth:sanctum');



Route::get('categories/{id}/produits', [CategorieController::class, 'produitsParCategorie']);

Route::post('/produits/{id}', [ProduitController::class, 'update']);

// Pour limiter un panier actif par utilisateur, ajoute une route POST spécifique 

// Optionnel : récupérer les produits par catégorie avec juste l'id de la catégorie
Route::get('produits/by-categorie/{id}', [ProduitController::class, 'produitsByCategorieId']);

Route::post('paniers/{id}/valider', [PanierController::class, 'validerPanier']);//->middleware('auth:sanctum');

Route::get('/paniers/{id}/produits', [PanierController::class, 'produitsParPanier']);


Route::get('factures/{id}/pdf', [FactureController::class, 'genererPdf']);//->middleware('auth:sanctum');


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});