import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../services/category/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit{

  constructor(private categorySvc: Category, private router: Router){}

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
    this.categorySvc.getAllCategories().subscribe({
      next: (res:any)=>{
        this.categoryList = res;
      },
       error: (err) => {
          if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vous connecter");
            this.router.navigate(['/login']);
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
        }
    });
  }

  onSave(){
    this.categorySvc.saveCategory(this.categoryOjt).subscribe({
      next: (res: any) => {
        alert("category Cree !");
        this.getAllCategories();
        this.clear();
      },
       error: (err) => {
          if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vous connecter");
            this.router.navigate(['/login']);
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
        }
    });
  }
  onUpdate(){
    this.categorySvc.updateCategory(this.categoryOjt).subscribe({
      next: (res: any) =>{
        alert("Categorie mise a jour !")
        this.getAllCategories();
        this.clear();
      },
       error: (err) => {
          if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vous connecter");
            this.router.navigate(['/login']);
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
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
      this.categorySvc.deleteCategory(cate.id).subscribe({
        next: (res:any) => {
          alert("Cette a bien ete supprime !");
          this.getAllCategories();
        },
         error: (err) => {
          if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vous connecter");
            this.router.navigate(['/login']);
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
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
