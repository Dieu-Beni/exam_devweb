import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  constructor(private router: Router){}
  onLogOut(){
    sessionStorage.clear();
    alert("Vous n'etes plus connecté")
    this.router.navigate(['/login']);
  }

}
