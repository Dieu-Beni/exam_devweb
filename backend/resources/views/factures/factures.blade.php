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

    <h2>Client</h2>
    <p><strong>Nom :</strong> {{ $client->nom }}</p>
    <p><strong>Prenom :</strong> {{ $client->prenom }}</p>
    <p><strong>Email :</strong> {{ $client->email }}</p>
    <p><strong>Adresse :</strong> {{ $client->adresse }}</p>
    <h2>Detail Commande</h2>
    <p><strong>Adresse livraison :</strong> {{ $commande->adresse }}</p>
    <p><strong>Téléphone :</strong> {{ $commande->telephone }}</p>
    <p><strong>Mode de paiement :</strong> {{ $paiement->mode }}</p>
    <p><strong>Statut du paiement :</strong> {{ $paiement->statut }}</p>
    <p><strong>Date :</strong> {{ \Carbon\Carbon::now()->format('d/m/Y H:i') }}</p>

    <h2>Produits achetés</h2>
    <table border="1" cellpadding="8" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix unitaire</th>
                <th>Quantité</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($produits as $produit)
                <tr>
                    <td>{{ $produit->nom }}</td>
                    <td>{{ number_format($produit->prix, 0, ',', ' ') }} FCFA</td>
                    <td>{{ $produit->pivot->quantite }}</td>
                    <td>{{ number_format($produit->prix * $produit->pivot->quantite, 0, ',', ' ') }} FCFA</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <p><strong>Montant Total:</strong> {{ number_format($commande->total, 0, ',', ' ') }} FCFA</p>
</body>
</html>
