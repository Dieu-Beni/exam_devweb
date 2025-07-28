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
    this.userSvc.login(this.loginObject).subscribe((res: any) => {
      if(res && res.access_token){
        alert("utilisateur connecte")
        this.router.navigateByUrl("/admin");
      }else{
        alert("Erreur utilisateur non reconnu")
        console.log(res)
      }
    })
    
  }
}
