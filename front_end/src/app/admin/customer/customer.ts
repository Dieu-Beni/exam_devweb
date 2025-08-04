import { Component, OnInit } from '@angular/core';
import { Users } from '../../services/users/users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css'
})
export class Customer implements OnInit{
  showAdd: boolean = false;

  user: any = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    adresse: '',
    role: ''
  }
  users: any [] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  pages: number[] = [];

  constructor(private userSvc: Users, private router: Router){}

  ngOnInit(): void {
    this.getAllUsers();
  }

  showPanel(){
    this.showAdd = true;
  }
  closePanel(){
    this.showAdd = false;
    this.clear();
  }
  clear(){
    this.user = {
      id: 0,
      nom: '',
      prenom: '',
      email: '',
      password: '',
      adresse: '',
      role: ''
    }
  }

  getAllUsers(){
    this.userSvc.getAll().subscribe({
      next: (res:any) => {
        this.users = res;
        this.updatePagination();
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
    })
  }

  onEdit(user: any){
    this.user = user;
    this.showPanel();
  }
  onDelete(user: any){
    
    const conf = confirm("Voulez vous vraiment supprimer cet utilisateur ?");
    if(conf){
      this.userSvc.delete(user.id).subscribe({
        next: (res: any) => {
          alert('Utilisateur supprime');
          this.getAllUsers();
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
    
  }

  onUpdate(){
    this.userSvc.update(this.user).subscribe({
      next: (res: any) => {
        alert("Utilisateur modifie !");
        this.getAllUsers();
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
    })

  }

  onSave(){
    this.userSvc.saveUser(this.user).subscribe({
      next: (res: any) => {
        alert("Utilisateur Cree avec succes !")
        this.getAllUsers();
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
    })
  }

  get totalPages(): number {
      return Math.ceil(this.users.length / this.pageSize);
    }
  
    getPaginatedusers(): any[] {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.users.slice(startIndex, startIndex + this.pageSize);
    }
  
    goToPage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    }
  
    updatePagination(): void {
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    }
    navToRoute(id: number){
      this.router.navigate(['admin/commande/', id]);
    }
}
