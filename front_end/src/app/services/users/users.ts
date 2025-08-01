import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constants/contant';

@Injectable({
  providedIn: 'root'
})
export class Users {

  constructor(private http: HttpClient){}

  saveUser(user: any){
    return this.http.post(Constant.API_END_POINT + Constant.METODS.USER, user);
  }

  login(user: any){
    return this.http.post(Constant.API_END_POINT + Constant.METODS.LOGIN, user);
  }

  getAll(){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.USER);
  }

  update(user: any){
    return this.http.put(Constant.API_END_POINT + Constant.METODS.USER + user.id, user);
  }
  delete(id: number){
    return this.http.delete(Constant.API_END_POINT + Constant.METODS.USER + id);
  }

  getUser(id: number){
    return this.http.get(Constant.API_END_POINT + Constant.METODS.USER + id);
  }
  
}
