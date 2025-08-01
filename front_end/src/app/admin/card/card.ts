import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private cardSvc: Cards
  ){
    activeRoute.params.subscribe((res: any) => {
      this.cardId = res.id;
      this.getCard(this.cardId)
    })
  }



  getCard(id: number){
    this.cardSvc.getCardProducts(id).subscribe((res: any) => {
      this.cardProducts = res.produits;
      console.log(res)
    })
  }
}
