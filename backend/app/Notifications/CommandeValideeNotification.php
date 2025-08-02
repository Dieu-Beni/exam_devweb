<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Commande;

class CommandeValideeNotification extends Notification
{
    protected $commande;

    public function __construct($commande)
    {
        $this->commande = $commande;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Votre commande a été validée')
            ->greeting("Bonjour {$notifiable->name},")
            ->line("Votre commande (#{$this->commande->id}) a été validée avec succès.")
            ->line("Montant : {$this->commande->total} FCFA")
            ->line("Adresse de livraison : {$this->commande->adresse}")
            ->line('Nous vous remercions pour votre confiance.')
            ->salutation('À bientôt !');

    }
}
