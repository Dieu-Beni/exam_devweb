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

  constructor(private orderSvc: OrderService, private userSvc: Users, private router: Router){}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderSvc.getOrders().subscribe((res: any) => {
      this.orders = res;
      this.orders.forEach(or => {
        this.userSvc.getUser(or.id_user).subscribe((res2: any) => {
          this.users.push(res2);
      });
      })

    })
  }

  showPanel(){
    this.showAdd = true;
  }
  closePanel(){
    this.showAdd = false;
  }

  onUpdate(){
    this.orderSvc.updateOrder(this.order).subscribe((res: any) => {
      if(res){
        alert('Statut modifie !');
      }
    })
  }

  getUser(id: number, us: any){
    this.userSvc.getUser(id).subscribe((res: any) => {
       us= res;
    });
  }

  navToRoute(id: number){
    this.router.navigate(['admin/cards', id])
  }
  onEdit(pro: any){
    this.showPanel();
    this.order = pro;
  }

  onDelete(id: number){
    const conf = confirm("Voulez vous vraiment suprimer cette commande?");
    if(conf){
      this.orderSvc.deleteOrder(id).subscribe((res: any) =>{
        alert('Commande suprimee !');
        this.getAllOrders();
      })
    }
  }

}
