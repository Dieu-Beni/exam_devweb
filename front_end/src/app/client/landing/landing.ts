import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Product } from '../../services/products/product';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit{

  categoryList: any[] = [];

  constructor(private prodSvc: Product, private router: Router){}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.prodSvc.getAllCategories().subscribe((res: any) => {
      if(res.result){
        this.categoryList = res.data;
      }
    })
  }


  navigateToRoute(id: number){
    this.router.navigate(['/product', id])
  }
  navToRoute(str: string){
    this.router.navigate([str])
  }
}
