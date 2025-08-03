import { Component, OnInit } from '@angular/core';
import { Cards } from '../../services/card/cards';
import { CommonModule } from '@angular/common';
import { Shared } from '../../services/shared/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-cart',
  imports: [CommonModule],
  templateUrl: './customer-cart.html',
  styleUrl: './customer-cart.css'
})
export class CustomerCart implements OnInit {

  proList: any[] = [];
  subTotal: number = 0;
  total: number = 0;
  quantite: number = 0;

  constructor(private card: Cards, private shared: Shared, private router: Router){}

  ngOnInit(): void {
    this.getAllpro();
   
    
  }

  getAllpro(){
    if(sessionStorage.getItem('id_panier')){
      const id = Number(sessionStorage.getItem('id_panier'));
    
      this.card.getCardProducts(id).subscribe({
        next: (res: any) => {
          if(res.message){
            this.proList = res.produits;
            this.shared.setVariable(this.proList.length);
            this.proList.forEach(p => {
              this.subTotal += Number(p.pivot.montant);
              this.quantite += Number(p.pivot.quantite);
            });
            this.total = this.subTotal + 1000;
          }
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
      });
    }else{
      alert("Vous n'etes pas connecte !");
      this.router.navigateByUrl('/login');
    }
    
  }

  addPlus(pro: any){
    if(pro.stock > pro.pivot.quantite){
      const panierPro:any = {
            'id': pro.pivot.id,
            'id_panier': pro.pivot.id_panier,
            'id_produit': pro.id,
            'quantite': pro.pivot.quantite + 1,
            'montant': Number(pro.pivot.montant) + Number(pro.prix)
          }
      this.card.updateProductCard(panierPro).subscribe({
        next: (res: any) => {
          this.getAllpro();
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
      alert('Quantite insuffisante !')
    }
  }

  addMinus(pro: any){
    if(pro.pivot.quantite > 1){
      const panierPro:any = {
            'id': pro.pivot.id,
            'id_panier': pro.pivot.id_panier,
            'id_produit': pro.id,
            'quantite': pro.pivot.quantite - 1,
            'montant': Number(pro.pivot.montant) - Number(pro.prix)
          }
      this.card.updateProductCard(panierPro).subscribe({
        next: (res: any) => {
          this.getAllpro();
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

  remove(pro: any){
    const conf = confirm("Vouslez vous retirer ce produit du panier ?");
    if(conf){
      this.card.deleteproductCard(pro.pivot.id).subscribe({
        next: (res: any) => {
          this.getAllpro();
          this.shared.setVariable(this.proList.length -1);
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
  navToRoute(str: string){
    this.router.navigate([str])
  }

}
