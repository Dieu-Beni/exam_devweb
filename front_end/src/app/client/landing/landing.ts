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
    this.prodSvc.getAllCategories().subscribe({
      next: (res: any) => {
        this.categoryList = res;
      },
      error: (err) =>{
        if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vérifier vos identifiants.");
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
      }
    });
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
    this.router.navigate(['/']);
  }

}
