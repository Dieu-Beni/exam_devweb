import { Component, OnInit } from '@angular/core';
import { Users } from '../../services/users/users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private userSvc: Users){}

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
    this.userSvc.getAll().subscribe((res:any) => {
      this.users = res;
      this.updatePagination();
    })
  }

  onEdit(user: any){
    this.user = user;
    this.showPanel();
  }
  onDelete(user: any){
    
    const conf = confirm("Voulez vous vraiment supprimer cet utilisateur ?");
    if(conf){
      this.userSvc.delete(user.id).subscribe((res: any) => {
      if(1){
        alert('Utilisateur supprime');
        this.getAllUsers();
        this.clear();
      }else{
        alert('Erreur de supression')
      }
      });
    }
    
  }

  onUpdate(){
    this.userSvc.update(this.user).subscribe((res: any) => {
      if(res.id){
        alert("Utilisateur modifie !");
        this.getAllUsers();
        this.clear();
      }
    })

  }

  onSave(){
    this.userSvc.saveUser(this.user).subscribe((res: any) => {
      if(res.id){
        alert("Utilisateur Cree avec succes !")
        this.getAllUsers();
        this.clear();
      }else{
        alert('Erreur de creation !')
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
}
