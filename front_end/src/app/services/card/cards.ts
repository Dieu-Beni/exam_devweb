import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/contant';

@Injectable({
  providedIn: 'root'
})
export class Cards {

  constructor(private http: HttpClient){

  }

  getCardProducts(product_id: number){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.CARD_PRODUCT_BY_ID_CARD + product_id + '/produits');
  }

  saveProductCard(product: any){
    return this.http.post(Constant.API_END_POINT + Constant.METODS.CARD_PRODUCT, product);
  }

  updateProductCard(pro: any){
    return this.http.put(Constant.API_END_POINT + Constant.METODS.CARD_PRODUCT + pro.id, pro);
  }

  deleteproductCard(id: number){
    return this.http.delete(Constant.API_END_POINT + Constant.METODS.CARD_PRODUCT + id);
  }
  
}
