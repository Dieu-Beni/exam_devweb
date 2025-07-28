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
      return this.http.get(Constant.API_END_POINT + Constant.METODS.CATEGORY);
    }
  
    saveCategory(category: any){
      return this.http.post(Constant.API_END_POINT + Constant.METODS.CATEGORY, category);
    }
  
    updateCategory(category: any){
      return this.http.put(Constant.API_END_POINT + Constant.METODS.CATEGORY + category.id, category);
    }
  
    deleteCategory(id: number){
      return this.http.delete(Constant.API_END_POINT + Constant.METODS.CATEGORY + id);
    }
}
