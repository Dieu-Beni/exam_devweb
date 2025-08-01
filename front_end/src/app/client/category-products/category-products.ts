import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../services/products/product';
import { CommonModule } from '@angular/common';
import { Category } from '../../services/category/category';
import { Shared } from '../../services/shared/shared';
import { Cards } from '../../services/card/cards';

@Component({
  selector: 'app-category-products',
  imports: [CommonModule],
  templateUrl: './category-products.html',
  styleUrl: './category-products.css'
})
export class CategoryProducts implements OnInit {

  activeCategoryId: number = 0;
  products: any[] = [];

   
    currentPage: number = 1;
    pageSize: number = 12;
    pages: number[] = [];
    categorie: string = '';
    numberItem: number = 0;
    proCardList: any [] =[];


  constructor(private activedRoute: ActivatedRoute, 
    private productSvc: Product, 
    private categorieSvc: Category,
    private shared: Shared,
    private router: Router,
    private card: Cards,

  ){
    this.activedRoute.params.subscribe((res: any) => {
      this.activeCategoryId = res.id;
      this.getCategorie(this.activeCategoryId);
    this.loadProducts();
    
    });
  }

  ngOnInit(): void {
    
    if(sessionStorage.getItem('id_panier')){
      const id = Number(sessionStorage.getItem('id_panier'));
      this.getAllProductsCard(id);
    }
    

  }

  loadProducts(){
    this.productSvc.getAllProductsByCategory(this.activeCategoryId).subscribe((res: any) => {
      this.products = res;
      this.updatePagination();
      
    })
  }

  getCategorie(id: number){
    this.categorieSvc.getById(id).subscribe((res: any) => {
      this.categorie = res.nom;
    })
  }
  
    get totalPages(): number {
      return Math.ceil(this.products.length / this.pageSize);
    }
  
    getPaginatedItems(): any[] {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.products.slice(startIndex, startIndex + this.pageSize);
    }
  
    goToPage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    }
  
    updatePagination(): void {
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    }

    addToCard(pro: any){
      if(sessionStorage.getItem('access_token') && sessionStorage.getItem('id_panier') !== ''){

        if(!this.proCardList.find(p => p.id === pro.id)){
          this.numberItem++;
          this.sendToParent(this.numberItem);
          this.proCardList.push(pro);
          //console.log(this.categoryList)
          const panierPro:any = {
            'id_panier': sessionStorage.getItem('id_panier'),
            'id_produit': pro.id,
            'quantite': 1
          }

          this.card.saveProductCard(panierPro).subscribe((res: any) => {
            if(res.message){
              alert('Ajout effectue !');
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
      this.card.getCardProducts(id).subscribe((res: any) => {
        this.proCardList = res.produits;
        this.numberItem = this.proCardList.length;
        this.sendToParent(this.numberItem)
      })
    }


    

}
