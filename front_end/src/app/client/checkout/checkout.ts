import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cards } from '../../services/card/cards';
import { Shared } from '../../services/shared/shared';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../services/order/order-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
  orderForm: FormGroup;

  constructor(private cardService: Cards, 
    private shared: Shared, 
    private orderSvc: OrderService, 
    private router: Router,
    private fb: FormBuilder,
  ){
    this.orderForm = fb.group({
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      mode_paiement: ['', Validators.required],
      numero: [''],
      date_expiration: [''],
      cvc: [''],
    });
  }

  ngOnInit(): void {
    this.orderForm.get('mode_paiement')?.valueChanges.subscribe(mode => {
      const numero = this.orderForm.get('numero');
      const date_expiration = this.orderForm.get('date_expiration');
      const cvc = this.orderForm.get('cvc');

      if (mode === 'en ligne') {
        numero?.setValidators([Validators.required, Validators.minLength(13), Validators.maxLength(19)]);
        date_expiration?.setValidators([Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]);
        cvc?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
      } else {
        numero?.clearValidators();
        date_expiration?.clearValidators();
        cvc?.clearValidators();
      }

      //mettre à jour la validité
      numero?.updateValueAndValidity();
      date_expiration?.updateValueAndValidity();
      cvc?.updateValueAndValidity();
    });

    this.getAllPro();
  }

  getAllPro(){
    const id = Number(sessionStorage.getItem('id_panier'))
    this.cardService.getCardProducts(id).subscribe({
      next: (res: any) => {
        this.productList = res.produits
        this.shared.setVariable(this.productList.length);
        this.productList.forEach(p => {
          this.subTotal += Number(p.pivot.montant);
          this.quantite += Number(p.pivot.quantite);
        });
        this.total = this.subTotal + 1000;
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

  onOrder(){
    if(this.productList.length > 0){

      if(this.orderForm.valid){

        this.orderObj.adresse = this.orderForm.get('adresse')?.value;
        this.orderObj.telephone = this.orderForm.get('telephone')?.value;
        this.orderObj.mode_paiement = this.orderForm.get('mode_paiement')?.value;
        this.orderObj.numero = this.orderForm.get('numero')?.value;
        this.orderObj.cvc = this.orderForm.get('cvc')?.value;
        this.orderObj.date_expiration = this.orderForm.get('date_expiration')?.value;

        this.orderObj.quantite =this.quantite;
        this.orderObj.total = this.total;
        
        this.orderSvc.saveOrder(this.orderObj).subscribe({
        next: (res: any) => {
          alert('Commande passee !');
          sessionStorage.setItem('id_panier', res.panier.id);
          this.shared.setVariable(0);
          this.router.navigate(['/shop']);
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
      }else{
        this.orderForm.markAllAsTouched();
      }
    }else{
      alert('Veillez ajouter un produit !')
    }
    
  }
}
