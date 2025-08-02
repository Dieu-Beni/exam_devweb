import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/contant';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    constructor(private http: HttpClient){}

    getPayments(id: number){
      return this.http.get(Constant.API_END_POINT + Constant.METODS.ORDER + id + '/paiement');
    }
    updatePayment(pay: any){
      return this.http.put(Constant.API_END_POINT + Constant.METODS.PAYMENT + pay.id, pay);
    }
}
