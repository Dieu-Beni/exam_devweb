import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-historique',
  imports: [CommonModule],
  templateUrl: './client-historique.html',
  styleUrl: './client-historique.css'
})
export class ClientHistorique implements OnInit{
  id_user: number = 0;
    orders: any[] = [];
    currentPage: number = 1;
    pageSize: number = 6;
    pages: number[] = [];
    isLoading: boolean = false;
  
    constructor(private orderSvc: OrderService, private router: Router, private activatedRoute: ActivatedRoute){}
  
    ngOnInit(): void {
      this.activatedRoute.params.subscribe((res: any) =>{
        console.log(res);
        this.id_user = Number(res.id_user);
        this.getAllOrders(this.id_user);
      });
    }
  
    getAllOrders(id: number){
      this.isLoading = true;
      this.orderSvc.getOrder(id).subscribe({
        next: (res: any) => {
          this.orders = res.commandes;
          this.updatePagination();
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
      this.isLoading = false;
    }
  
    get totalPages(): number {
        return Math.ceil(this.orders.length / this.pageSize);
      }
    
      getPaginatedItems(): any[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.orders.slice(startIndex, startIndex + this.pageSize);
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
