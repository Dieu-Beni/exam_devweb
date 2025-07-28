import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../services/products/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-products',
  imports: [CommonModule],
  templateUrl: './category-products.html',
  styleUrl: './category-products.css'
})
export class CategoryProducts {

  activeCategoryId: number = 0;
  products: any[] = [];

   
    currentPage: number = 1;
    pageSize: number = 12;
    pages: number[] = [];

  constructor(private activedRoute: ActivatedRoute, private productSvc: Product){
    this.activedRoute.params.subscribe((res: any) => {
      this.activeCategoryId = res.id;
      this.loadProducts();
    });
  }

  loadProducts(){
    this.productSvc.getAllProductsByCategory(this.activeCategoryId).subscribe((res: any) => {
      this.products = res.data;
      this.updatePagination();
      
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

}
