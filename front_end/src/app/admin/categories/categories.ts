import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../services/category/category';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements  OnInit{

  constructor(private categorySvc: Category){}

  showAdd: boolean = false;
  categoryOjt: any = {
    "categoryId": 0,
    "categoryName": "",
    "parentCategoryId": 0,
    "userId": null
  };

  categoryList: any [] = [];
  ngOnInit(): void {
    this.getAllCategories();
  }

  showPanel(){
    this.showAdd = true;
  }
  closePanel(){
    this.showAdd = false;
  }
  getAllCategories(){
    this.categorySvc.getAllCategories().subscribe((res:any)=>{
      this.categoryList = res.data;
    });
  }



}
