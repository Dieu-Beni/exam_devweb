import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../services/users/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit{
   user:any = {
    nom: "",
    prenom: "",
    email: "",
    password: "",
    password_confirmation: "",
    adresse: "",
    role: "client",

  }
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userSvc: Users, private router: Router){
    this.userForm = fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      adresse: ['', Validators.required],
      password_confirmation: ['', [Validators.required, Validators.minLength(8), ]]

    });
    
  }

  ngOnInit(): void {
    if(Number(sessionStorage.getItem('user_id'))){
      this.userSvc.getUser(Number(sessionStorage.getItem('user_id'))).subscribe((res: any) => {
        this.user = res;
        this.userForm.patchValue({
          nom: this.user.nom,
          prenom: this.user.prenom,
          email: this.user.email,
          adresse: this.user.adresse
        });
      })
    }
  }

 

  onUpdate(){
    
    if(this.userForm.valid){
      if(this.userForm.value.password === this.userForm.value.password_confirmation){
        this.user.nom = this.userForm.value.nom;
        this.user.prenom = this.userForm.value.prenom;
        this.user.email = this.userForm.value.email;
        this.user.password = this.userForm.value.password;
        this.user.password_confirmation = this.userForm.value.password_confirmation;
        this.user.adresse = this.userForm.value.adresse;

        this.userSvc.update(this.user).subscribe((res: any) => {
          if(res && res.id){
            alert("Vos informations ont ete mis a jour");
            sessionStorage.setItem("user_name", this.user.nom);
            sessionStorage.setItem("role", this.user.role);
            this.router.navigate(['/login'])

          }else{
            alert("Erreur de modification");
          }
        });
      }else{
        alert("")
      }
        
    }else{
      this.userForm.markAllAsTouched();
    }
  }
}
