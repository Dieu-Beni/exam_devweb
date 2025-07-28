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
export class Categories implements OnInit{

  constructor(private categorySvc: Category){}

  showAdd: boolean = false;
  categoryOjt: any = {
    id: 0,
    nom: "",

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
    this.clear();
  }
  getAllCategories(){
    this.categorySvc.getAllCategories().subscribe((res:any)=>{
      this.categoryList = res;
      
    });
  }

  onSave(){
    this.categorySvc.saveCategory(this.categoryOjt).subscribe((res: any) => {
      if(res && res.id){
        alert("category Cree !");
        this.getAllCategories();
        this.clear();
      }else{
        alert(res.message);
      }
    });
  }
  onUpdate(){
    this.categorySvc.updateCategory(this.categoryOjt).subscribe((res: any) =>{
      if(res && res.id){
        alert("Categorie mise a jour !")
        this.getAllCategories();
        this.clear();
      }else{
        alert(res.message);
      }
    });
    this.getAllCategories();

  }

  onEdit(cate: any){
    this.categoryOjt = cate;
    this.showPanel();
  }

  onDelete(cate: any){
    const verif = confirm("Voulez vous vraiment supprime cette categorie ?");
    if(verif){
      this.categorySvc.deleteCategory(cate.id).subscribe((res:any) => {
        if(1){
          alert("Cette a bien ete supprime !");
          this.getAllCategories();
        }else{
          alert(res.massage)
        }
      });
    }
  }

  clear(){
    this.categoryOjt = {
      id: 0,
      nom: "",

    };
  }


}
