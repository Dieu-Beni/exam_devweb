import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../services/products/product';
import { Router } from '@angular/router';
import { Shared } from '../../services/shared/shared';
import { Cards } from '../../services/card/cards';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-products.html',
  styleUrl: './client-products.css'
})
export class ClientProducts implements OnInit{
  @Output() variableChange = new EventEmitter<number>(); 
   productsOjt: any = {
      id: 0,
      nom: "",
      description: "",
      prix: 0,
      stock: 0,
      id_categorie: 0,
      imageUrl: "",
    };
  
    prodlist: any [] = [];
    categoryList: any[] = [];
    items: any[] = [];
    currentPage: number = 1;
    pageSize: number = 9;
    pages: number[] = [];
    numberItem: number = 0;
    proCardList: any[] =[];
    isLoading: boolean = false;
    filteredProducts: any[] = [];
    searchTerm: string = '';
  
    constructor(private prodSvc: Product, private router: Router, private shared: Shared, private card: Cards){}
  
    ngOnInit(): void {
      this.getAllProducts();
      const id = Number(sessionStorage.getItem('id_panier'));
      if(sessionStorage.getItem('id_panier')){
        this.getAllProductsCard(id);
      }
      
    }
  
    getAllProducts(){
      this.isLoading = true;
      this.prodSvc.getProducts().subscribe({
        next: (res: any) => {
          this.prodlist = res;
          this.items = res;
          this.updatePagination();
          this.isLoading = false;
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
  
    getAllCategories(){
      this.prodSvc.getAllCategories().subscribe({
        next: (res: any) => {
          this.categoryList = res.data;
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
  
    get totalPages(): number {
      return Math.ceil(this.items.length / this.pageSize);
    }
  
    getPaginatedItems(): any[] {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.items.slice(startIndex, startIndex + this.pageSize);
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
  
    navigateToRoute(id: number){
      this.router.navigate(['/detailPro', id])
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
              alert('Ajout effectue !');
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


    onSearch() {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.prodlist.filter(p =>
        p.nom.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
      console.log(this.filteredProducts);
      this.items = this.filteredProducts;
      this.updatePagination();
    }


}
