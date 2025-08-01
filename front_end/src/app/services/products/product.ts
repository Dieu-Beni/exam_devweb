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
      return this.http.get(Constant.API_END_POINT + Constant.METODS.PRODUCT);
  }
  getProducts(){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.PRODUCT);
  }
  getProduct(id: number){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.PRODUCT + id);
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
    return this.http.post(Constant.API_END_POINT + Constant.METODS.PRODUCT + product.get('id'), product);
  }

  deleteProduct(id: any){
    return this.http.delete(Constant.API_END_POINT + Constant.METODS.PRODUCT + id);
  }

  
  
}
