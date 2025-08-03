import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Users } from '../../services/users/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [FormsModule, CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit{

  order: any = {
    id: 0,
    total: 0,
    quantite: 0,
    adresse: '',
    telephone: '',
    id_user: 0,
    id_panier: 0,
    statut: '',
  }

  user: any = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    adresse: '',
    role: ''
  }
  users: any[] = [];

  showAdd: boolean = false;
  orders: any[] = [];
  currentPage: number = 1;
  pageSize: number = 7;
  pages: number[] = [];

  constructor(private orderSvc: OrderService, private userSvc: Users, private router: Router){}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderSvc.getOrders().subscribe({
      next: (res: any) => {
        console.log(res)
        this.orders = res;
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
    })
  }

  showPanel(){
    this.showAdd = true;
  }
  closePanel(){
    this.showAdd = false;
  }

  onUpdate(){
    this.orderSvc.updateOrder(this.order).subscribe({
      next: (res: any) => {
        alert('Statut modifie !');
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

  getUser(id: number, us: any){
    this.userSvc.getUser(id).subscribe({
      next: (res: any) => {
       us= res;
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
  }

  navToRoute(id: number, path: string){
    this.router.navigate([path, id])
  }
  onEdit(pro: any){
    this.showPanel();
    this.order = pro;
  }

  onDelete(id: number){
    const conf = confirm("Voulez vous vraiment suprimer cette commande?");
    if(conf){
      this.orderSvc.deleteOrder(id).subscribe({
        next:(res: any) =>{
          alert('Commande suprimee !');
          this.getAllOrders();
        },
        error: (err) =>{
          console.error(err.error);
          alert(err.error.message);
        }
      })
    }
  }

  get totalPages(): number {
      return Math.ceil(this.orders.length / this.pageSize);
    }
  
    getPaginatedusers(): any[] {
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
