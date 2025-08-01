import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  imports: [CommonModule],
  templateUrl: './customer-orders.html',
  styleUrl: './customer-orders.css'
})
export class CustomerOrders implements OnInit{

  id_user: number = 0;
  orders: any[] = [];

  constructor(private orderSvc: OrderService){}

  ngOnInit(): void {
    this.id_user = Number(sessionStorage.getItem('user_id'));
    console.log(this.id_user)
    this.getAllOrders(this.id_user);
  }

  getAllOrders(id: number){
    this.orderSvc.getOrder(id).subscribe((res: any) => {
      console.log('La rep ', res)
      this.orders = res.commandes;
    })
  }

  getFacture(id: number){
    this.orderSvc.getFacture(id).subscribe((res: any) => {
      console.log(res);
    })
  }

}
