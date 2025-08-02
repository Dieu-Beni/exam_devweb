<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Commande;
use App\Models\User;

class CommandeClientNotification extends Notification
{
    protected $commande;
    protected $client;

    public function __construct($commande, $client)
    {
        $this->commande = $commande;
        $this->client = $client;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Nouvelle commande reçue')
            ->greeting('Bonjour Admin,')
            ->line("Le client **{$this->client->name}** a passé une commande (#{$this->commande->id}).")
            ->line("Montant : {$this->commande->total} FCFA")
            ->line("Adresse : {$this->commande->adresse}")
            ->line("Téléphone : {$this->commande->telephone}")
            ->line('Veuillez consulter le tableau de bord pour plus de détails.')
            ->salutation('Merci');

    }
}
