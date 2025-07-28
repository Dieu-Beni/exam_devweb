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
  
}
