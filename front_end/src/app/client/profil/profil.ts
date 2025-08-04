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
      password: ['', [Validators.minLength(8)]],
      adresse: ['', Validators.required],
      password_confirmation: ['', [Validators.minLength(8), ]],
      check: ['', Validators.required]

    });
    
  }

  ngOnInit(): void {
    if(Number(sessionStorage.getItem('user_id'))){
      this.userSvc.getUser(Number(sessionStorage.getItem('user_id'))).subscribe({
        next: (res: any) => {
          this.user = res;
          this.userForm.patchValue({
            nom: this.user.nom,
            prenom: this.user.prenom,
            email: this.user.email,
            adresse: this.user.adresse
        });
      },
      error: (err) => {
        if (err.status === 401) {
            alert("Accès non autorisé. Veuillez vous connecter");
          } else {
            alert(err.error.message || "Une erreur s’est produite.");
            console.error(err); // utile pour le debug
          }
      }
    })
    }

    this.userForm.get('check')?.valueChanges.subscribe(pass=>{
      const password = this.userForm.get('password');
      const password_confirmation = this.userForm.get('password_confirmation');
      if(pass){
        password?.setValidators([Validators.required, Validators.minLength(8)]);
        password_confirmation?.setValidators([Validators.required, Validators.minLength(8)])
      }else{
        password?.clearValidators();
        password_confirmation?.clearValidators()
      }
      password?.updateValueAndValidity();
      password_confirmation?.updateValueAndValidity();
    });
  }

 

  onUpdate(){
    console.log(this.userForm.value.check)
    
    if(this.userForm.valid){
        this.user.nom = this.userForm.value.nom;
        this.user.prenom = this.userForm.value.prenom;
        this.user.email = this.userForm.value.email;
        this.user.adresse = this.userForm.value.adresse;

        if(this.userForm.get('check')?.value === true){

          if(this.userForm.value.password === this.userForm.value.password_confirmation){
            this.user.password = this.userForm.value.password;
            this.user.password_confirmation = this.userForm.value.password_confirmation;
          }else{
            alert('Les mots de passe ne correspondent pas !');
            return;
          }

        }


        this.userSvc.update(this.user).subscribe({
          next: (res: any) => {
            alert("Vos informations ont ete mis a jour");
            sessionStorage.setItem("user_name", this.user.nom);
            sessionStorage.setItem("role", this.user.role);
            this.router.navigate(['/login'])

          },
          error: (err)=>{
            console.log(err);
            alert(err.error.message)
          }
        });
        
    }else{
      this.userForm.markAllAsTouched();
    }
  }
}
