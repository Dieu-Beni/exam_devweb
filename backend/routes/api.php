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
use App\Http\Controllers\StatController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ImageController;

use Illuminate\Support\Facades\Storage;
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


Route::apiResource('categories', CategorieController::class);
Route::apiResource('produits', ProduitController::class);



Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    
    
    Route::apiResource('users', UserController::class);
    Route::apiResource('paniers', PanierController::class);
    Route::apiResource('commandes', CommandeController::class);
    Route::apiResource('factures', FactureController::class);
    Route::apiResource('paiements', PaiementController::class);
    Route::apiResource('panier_produits', Panier_produitController::class);
    Route::get('commandes-par-utilisateurs', [CommandeController::class, 'commandesParUtilisateurs']);
    Route::get('/commandes/{id}/paiement', [CommandeController::class, 'paiementParCommande']);
    Route::get('categories/{id}/produits', [CategorieController::class, 'produitsParCategorie']);
    Route::get('/commandes/utilisateur/{id}', [CommandeController::class, 'historiqueClient']);
    Route::get('/statistiques', [StatController::class, 'chiffreAffaire']);
    Route::post('/produits/{id}', [ProduitController::class, 'update']);
    Route::get('produits/by-categorie/{id}', [ProduitController::class, 'produitsByCategorieId']);
    Route::post('paniers/{id}/valider', [PanierController::class, 'valider']);
    Route::get('/paniers/{id}/produits', [PanierController::class, 'produitsParPanier']);
    Route::post('/commandes', [CommandeController::class, 'store']);
    Route::get('factures/{id}/pdf', [FactureController::class, 'genererPdf']);
    
    
});