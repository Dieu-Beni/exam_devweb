import { HttpClient} from '@angular/common/http';
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
  getProducts(){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.PRODUCT);
  }
  getAllProductsByCategory(id: number){
      return this.http.get(Constant.API_END_POINT + Constant.METODS.GET_PRODUCTS_BY_ID_CATEGORY + id);
  }
  getAllCategories(){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.CATEGORY);
  }

  saveProduct(product: any){
    return this.http.post(Constant.API_END_POINT + Constant.METODS.PRODUCT, product);
  }

  updateproduct(product: any){
    return this.http.post(Constant.API_END_POINT + Constant.METODS.UPDATE_PRODUCT, product);
  }

  deleteProduct(id: any){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.DELETE_PRODUCT + id);
  }

  
  
}
