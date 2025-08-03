import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cards } from '../../services/card/cards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card{
  cardId: number = 0;
  cardProducts: any []  =[];

  constructor(private activeRoute: ActivatedRoute,
    private cardSvc: Cards,
    private router: Router
  ){
    activeRoute.params.subscribe({
      next: (res: any) => {
        this.cardId = res.id;
        this.getCard(this.cardId)
      },
       error: (err) => {
          if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vous connecter");
            this.router.navigate(['/login']);
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
        }
    })
  }



  getCard(id: number){
    this.cardSvc.getCardProducts(id).subscribe({
      next: (res: any) => {
        this.cardProducts = res.produits;
      },
       error: (err) => {
          if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vous connecter");
            this.router.navigate(['/login']);
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
        }
    })
  }
}
