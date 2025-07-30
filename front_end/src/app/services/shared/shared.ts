import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Shared {

 private variableS = new BehaviorSubject<any>(null);
 variable$ = this.variableS.asObservable();

 setVariable(value: any) {
    this.variableS.next(value);
  }
  
}
