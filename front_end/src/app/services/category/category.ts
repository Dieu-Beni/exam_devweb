import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/contant';

@Injectable({
  providedIn: 'root'
})
export class Category {
  constructor(private http: HttpClient){
     
    }
   
    getAllCategories(){
      return this.http.get(Constant.API_END_POINT + Constant.METODS.GET_ALL_CATEGORIES);
    }
  
    saveCategory(category: any){
      return this.http.post(Constant.API_END_POINT + Constant.METODS.CREATE_CATEGORY, category);
    }
  
    updateCategory(category: any){
      return this.http.post(Constant.API_END_POINT + Constant.METODS.UPDATE_CATEGORY, category);
    }
  
    deleteCategory(id: any){
      return this.http.get(Constant.API_END_POINT + Constant.METODS.DELETE_CATEGORY + id);
    }
}
