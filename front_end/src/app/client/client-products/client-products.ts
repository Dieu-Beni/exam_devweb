import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/products/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-products',
  imports: [CommonModule],
  templateUrl: './client-products.html',
  styleUrl: './client-products.css'
})
export class ClientProducts implements OnInit{
   productsOjt: any = {
      "productId": 0,
      "productSku": "",
      "productName": "",
      "productPrice": 0,
      "productShortName": "",
      "productDescription": "",
      "createdDate": new Date(),
      "deliveryTimeSpan": "",
      "categoryId": 0,
      "productImageUrl": "",
      "userId": 0
    };
  
    prodlist: any [] = [];
    categoryList: any[] = [];
    items: any[] = [];
    currentPage: number = 1;
    pageSize: number = 12;
    pages: number[] = [];
  
    constructor(private prodSvc: Product, private router: Router){}
  
    ngOnInit(): void {
      this.getAllProducts();
    }
  
    getAllProducts(){
      this.prodSvc.getProducts().subscribe((res: any) => {
        if(res.result){
          this.prodlist = res.data;
          this.items = res.data;
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
      this.router.navigate(['/product', id])
    }
}
