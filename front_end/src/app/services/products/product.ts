import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/contant';

@Injectable({
  providedIn: 'root'
})
export class Product {

  constructor(private http: HttpClient){
   
  }
  getAllProducts(){
      return this.http.get(Constant.API_END_POINT + Constant.METODS.GET_ALL_PRODUCTS);
  }
  getAllCategories(){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.GET_ALL_CATEGORIES);
  }

  saveProduct(product: any){
    return this.http.post(Constant.API_END_POINT + Constant.METODS.CREATE_PRODUCT, product);
  }

  updateproduct(product: any){
    return this.http.post(Constant.API_END_POINT + Constant.METODS.UPDATE_PRODUCT, product);
  }

  deleteProduct(id: any){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.DELETE_PRODUCT + id);
  }

  
  
}
