<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Facture</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>Facture - Commande #{{ $commande->id }}</h1>
    <p><strong>Client :</strong> {{ $commande->adresse }}</p>
    <p><strong>Téléphone :</strong> {{ $commande->telephone }}</p>
    <p><strong>Montant :</strong> {{ number_format($commande->total, 0, ',', ' ') }} FCFA</p>
    <p><strong>Mode de paiement :</strong> {{ $paiement->mode }}</p>
    <p><strong>Statut du paiement :</strong> {{ $paiement->statut }}</p>
    <p><strong>Date :</strong> {{ \Carbon\Carbon::now()->format('d/m/Y H:i') }}</p>
</body>
</html>
