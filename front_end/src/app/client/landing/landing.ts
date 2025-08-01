import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Product } from '../../services/products/product';
import { Shared } from '../../services/shared/shared';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit{

  categoryList: any[] = [];
  numberItem: number = 0;
  id_user: number = 0;

  constructor(private prodSvc: Product, private router: Router, private shared: Shared){
    
  }

  ngOnInit(): void {
    this.shared.variable$.subscribe(value => {
      if(value !== null){
        this.numberItem = value;
      }
    })
    this.getAllCategories();
    this.id_user = Number(sessionStorage.getItem('user_id'));
  }

  getAllCategories(){
    this.prodSvc.getAllCategories().subscribe((res: any) => {
      if(res){
        this.categoryList = res;
      }
    })
  }


  navigateToRoute(id: number){
    this.router.navigate(['/product', id])
  }
  navToRoute(str: string){
    this.router.navigate([str])
  }

  logout(){
    sessionStorage.clear();
    alert('Deconnexion reussie');
    this.ngOnInit();
  }

}
