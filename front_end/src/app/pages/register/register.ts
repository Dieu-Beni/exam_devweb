import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../services/users/users';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userSvc: Users, private router: Router){
    this.userForm = fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      adresse: ['', Validators.required],


    });
  }

  user:any = {
    nom: "",
    prenom: "",
    email: "",
    password: "",
    password_confirmation: "",
    adresse: "",
    role: "client",

  }

  onRegister(){
    if(this.userForm.valid){
      
      this.user.nom = this.userForm.value.nom;
      this.user.prenom = this.userForm.value.prenom;
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      this.user.password_confirmation = this.userForm.value.password;
      this.user.adresse = this.userForm.value.adresse;

      this.userSvc.saveUser(this.user).subscribe({
        next: (res: any) => {
          alert("Compte Cree");
          sessionStorage.setItem("user_name", this.user.nom);
          sessionStorage.setItem("role", this.user.role);
          this.router.navigate(['/login'])
        },
        error: (err) => {
          if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vérifier vos identifiants.");
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
        }
      });
    }else{
      this.userForm.markAllAsTouched();
    }
  }
}
