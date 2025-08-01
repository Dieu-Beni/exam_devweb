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

      this.userSvc.saveUser(this.user).subscribe((res: any) => {
        //console.log(res)
        if(res && res.id){
          alert("Compte Cree");
          sessionStorage.setItem("user_name", this.user.nom);
          sessionStorage.setItem("role", this.user.role);
          this.router.navigate(['/login'])

        }else{
          alert("Erreur de creation");
          //console.log(res.message)
        }
      })
      
      //console.log(this.user)
    }else{
      this.userForm.markAllAsTouched();
    }
  }
}
