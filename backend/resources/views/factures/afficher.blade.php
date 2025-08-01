<!DOCTYPE html>
<html>
<head>
    <title>Facture</title>
</head>
<body style="margin: 0; padding: 0;">
    <embed src="{{ asset($facture->fichier_pdf) }}" type="application/pdf" width="100%" height="100%">
</body>
</html>
