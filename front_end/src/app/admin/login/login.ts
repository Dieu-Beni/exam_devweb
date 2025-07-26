import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  loginObject: any = {
    username: '',
    password: '',
  }

  constructor(private router: Router){}

  onLogin(){
    console.log('admin')
    if(this.loginObject.username == "admin" && this.loginObject.password == "passer"){

        this.router.navigateByUrl("/products");

    }else{
      alert("Erreur")
    }
  }
}
