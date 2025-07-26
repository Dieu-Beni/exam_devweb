import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Product } from '../../services/products/product';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit{

  showAdd: boolean = false;
  productsOjt: any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": "",
    "userId": 0
  };

  categoryList: any [] = [];
  productList: any [] = [];

  constructor(private productSvc: Product){}
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  showPanel(){
    this.showAdd = true;
  }
  closePanel(){
    this.showAdd = false;
  }
  getAllCategories(){
    this.productSvc.getAllCategories().subscribe((res:any)=>{
      this.categoryList = res.data;
    });
  }

  getAllProducts(){
    this.productSvc.getAllProducts().subscribe((res: any) => {
      this.productList = res.data;
    })
  }

  onUpdate(){
    this.productSvc.updateproduct(this.productsOjt).subscribe((res: any) => {
      debugger;
      if(res.result){
        alert("Produit modifie");
        this.getAllProducts();
      }else{
        alert(res.message)
      }
    })
  }

  onSave(){
    this.productSvc.saveProduct(this.productsOjt).subscribe((res: any) => {
      debugger;
      if(res.result){
        alert("Produit cree");
        this.getAllProducts();
      }else{
        alert(res.message)
      }
    })
  }

  onDelete(product: any){
    const verif = confirm("Voulez vous vraiment supprime ce produit ?");
    if(verif){
      this.productSvc.deleteProduct(product.productId).subscribe((res: any) => {
        if(res.result){
          alert("Produit Supprime !");
          this.getAllProducts();
        }else{
          alert(res.message);
        }
    });
    }
    
  }

  onEdit(item: any){
    this.productsOjt = item;
    this.showPanel();
  }

  clear(){
    this.productsOjt = {};
  }

}
