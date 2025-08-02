import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/contant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private http: HttpClient){}

  getOrders(){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.ORDER);
  }

  saveOrder(order: any){
    return this.http.post(Constant.API_END_POINT + Constant.METODS.ORDER, order);
  }
  
  updateOrder(order: any){
    return this.http.put(Constant.API_END_POINT + Constant.METODS.ORDER + order.id, order);
  }

  deleteOrder(id: number){
    return this.http.delete(Constant.API_END_POINT + Constant.METODS.ORDER + id);
  }

  getOrder(id_user: number){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.ORDER_USER + id_user);
  }
  getFacture(id: number){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.FACTURE + id + '/pdf');
  }

  getStats(): Observable<any>{
    return this.http.get(Constant.API_END_POINT + Constant.METODS.STATS);
  }

}
