<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Commande;

class PaiementNotification extends Notification
{
    use Queueable;

   protected $paiement;

    public function __construct($paiement)
    {
        $this->paiement = $paiement;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Paiement effectué')
            ->greeting("Bonjour {$notifiable->name},")
            ->line("Votre compte a ete debité de : (#{$this->paiement->montant}) FCFA")
            ->line('Nous vous remercions pour votre confiance.')
            ->salutation('À bientôt !');

    }
}
