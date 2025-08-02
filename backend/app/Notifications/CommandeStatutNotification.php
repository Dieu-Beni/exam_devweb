<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Commande;

class CommandeStatutNotification extends Notification
{
    use Queueable;

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
            ->subject('Modification du statut de votre commande sur BestProduct')
            ->greeting("Bonjour {$notifiable->name},")
            ->line("Le statut de votre commande (#{$this->commande->id}) a été modifie")
            ->line("Nouveau statut : {$this->commande->statut}")
            ->line("Adresse de livraison : {$this->commande->adresse}")
            ->line('Nous vous remercions pour votre confiance.')
            ->salutation('À bientôt !');
        }
}
