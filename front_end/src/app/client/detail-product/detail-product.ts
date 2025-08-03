import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/products/product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cards } from '../../services/card/cards';
import { Shared } from '../../services/shared/shared';

@Component({
  selector: 'app-detail-product',
  imports: [FormsModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css'
})
export class DetailProduct implements OnInit{
  product: any = {
    nom: '',
    prix: 0,
    stock: 0,
    description: '',
    categorie: {
      nom: ''
    }
  }
  numberItem: number = 0;
  proCardList: any[] =[];

  constructor(private productSvc: Product, 
    private activedRoute: ActivatedRoute, 
    private router: Router, 
    private card: Cards,
    private shared: Shared
  ){
    activedRoute.params.subscribe({
      next: (res: any) => {
        this.getPro(res.id);
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

  ngOnInit(): void {
    const id = Number(sessionStorage.getItem('id_panier'));
    this.getAllProductsCard(id);
    console.log(id)
  }

  getPro(id: number){
    this.productSvc.getProduct(id).subscribe({
      next: (result: any) => {
        this.product = result;
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


   addToCard(pro: any){
      if(sessionStorage.getItem('access_token') && sessionStorage.getItem('id_panier') !== ''){

        if(!this.proCardList.find(p => p.id === pro.id)){
          this.numberItem++;
          this.sendToParent(this.numberItem);
          this.proCardList.push(pro);
          const panierPro:any = {
            'id_panier': sessionStorage.getItem('id_panier'),
            'id_produit': pro.id,
            'quantite': 1
          }

          this.card.saveProductCard(panierPro).subscribe({
            next: (res: any) => {
            if(res.message){
              alert('Ajout effectue !');
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
          })

        }
      }else{
        alert("Utilisateur non connecte");
        this.router.navigateByUrl('/login');
      }
    }

    sendToParent(num: number) {
      this.shared.setVariable(num);
    }

    getAllProductsCard(id: number){
      this.card.getCardProducts(id).subscribe({
        next: (res: any) => {
          this.proCardList = res.produits;
          this.numberItem = this.proCardList.length;
          this.sendToParent(this.numberItem);
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
