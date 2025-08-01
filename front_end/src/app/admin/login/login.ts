import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../services/users/users';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  loginObject: any = {
    email: '',
    password: '',
  }

  constructor(private router: Router, private userSvc: Users){}

  onLogin(){
    this.userSvc.login(this.loginObject).subscribe(
      (res: any) => {
      if(res && res.access_token){
        console.log("La reponse ",res);
        alert("utilisateur connecte");
        sessionStorage.setItem("user_name", res.user.nom);
        sessionStorage.setItem("role", res.user.role);
        sessionStorage.setItem("user_id", res.user.id);
        sessionStorage.setItem("email", res.user.email);
        sessionStorage.setItem("access_token", res.access_token);

        if(res.user.role == "client"){
          sessionStorage.setItem("id_panier", res.panier_id);
          this.router.navigateByUrl("/");

        }else this.router.navigateByUrl("/admin");
      }else{
        alert("Erreur utilisateur non reconnu")
        console.log(res)
      }
    })
    
  }
}
