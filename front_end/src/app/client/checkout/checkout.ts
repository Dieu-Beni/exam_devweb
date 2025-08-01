import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cards } from '../../services/card/cards';
import { Shared } from '../../services/shared/shared';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order/order-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit{

  productList: any[] = [];
  subTotal: number = 0;
  total: number = 0;
  quantite: number = 0;

  orderObj: any = {
    id_user: Number(sessionStorage.getItem('user_id')),
    adresse: '',
    telephone: '',
    quantite: 0,
    total: 0,
    id_panier: Number(sessionStorage.getItem('id_panier')),
    mode_paiement: '',
    statut: 'en attente',
    numero: '',
    date_expiration: '',
    cvc: 0,
  }

  constructor(private cardService: Cards, private shared: Shared, private orderSvc: OrderService, private router: Router){}

  ngOnInit(): void {
    this.getAllPro();
    console.log(this.orderObj);
  }

  getAllPro(){
    const id = Number(sessionStorage.getItem('id_panier'))
    this.cardService.getCardProducts(id).subscribe((res: any) => {
      if(res){
        this.productList = res.produits
        this.shared.setVariable(this.productList.length);
        this.productList.forEach(p => {
          this.subTotal += Number(p.pivot.montant);
          this.quantite += Number(p.pivot.quantite);
        });
        this.total = this.subTotal + 1000;
      }
    })
  }

  onOrder(){
    if(this.productList.length > 0){
      console.log(this.orderObj);
      debugger;
      if(this.orderObj.adresse !== '' && this.orderObj.telephone !== '' && this.orderObj.mode_paiement !== ''){
      this.orderObj.quantite =this.quantite;
      this.orderObj.total = this.total;
      this.orderSvc.saveOrder(this.orderObj).subscribe((res: any) => {
        if(res){
          console.log(res);
          alert('Commande passee !');
          sessionStorage.setItem('id_panier', res.panier.id);
          this.shared.setVariable(0);
          this.router.navigate(['/shop']);
        }
      })
      }else{
        alert("Tous les champs sont obligatoire !")
      }
      console.log(this.orderObj);
    }else{
      alert('Veillez ajouter un produit !')
    }
    
  }
}
