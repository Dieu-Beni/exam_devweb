import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../services/products/product';
import { Router } from '@angular/router';
import { Shared } from '../../services/shared/shared';
import { Cards } from '../../services/card/cards';

@Component({
  selector: 'app-client-products',
  imports: [CommonModule],
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
    pageSize: number = 12;
    pages: number[] = [];
    numberItem: number = 0;
    proCardList: any[] =[];
  
    constructor(private prodSvc: Product, private router: Router, private shared: Shared, private card: Cards){}
  
    ngOnInit(): void {
      this.getAllProducts();
      const id = Number(sessionStorage.getItem('id_panier'));
      if(sessionStorage.getItem('id_panier')){
        this.getAllProductsCard(id);
      }
      
    }
  
    getAllProducts(){
      this.prodSvc.getProducts().subscribe((res: any) => {
        if(res){
          this.prodlist = res;
          this.items = res;
          this.updatePagination();
        }else{
          alert(res.message)
        }
      })
    }
  
    getAllCategories(){
      this.prodSvc.getAllCategories().subscribe((res: any) => {
        if(res.result){
          this.categoryList = res.data;
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
        //console.log("la liste: ",res)
        this.proCardList = res.produits;
        //console.log(this.proCardList)
        this.numberItem = this.proCardList.length;
        //console.log("num: ", this.numberItem)
        this.sendToParent(this.numberItem)
      })
    }

}
