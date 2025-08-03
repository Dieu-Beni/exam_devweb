import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment/payment-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paiement',
  imports: [CommonModule, FormsModule],
  templateUrl: './paiement.html',
  styleUrl: './paiement.css'
})
export class Paiement {
  id: number = 0;
  showAdd: boolean = false;
  paiement: any = {
    id: 0,
    mode: '',
    statut: ''
  };
  facture: any = {
    id: 0,
    montant: 0,
    fichier_pdf: ''
  };
  carte: any = {
    id: 0,
    cvc: 0,
    num: 0,
    date: ''
  }
  constructor(private activatedRoute: ActivatedRoute, private paiementScv: PaymentService, private router: Router){
    activatedRoute.params.subscribe((res: any) => {
      this.id = res.id;
      this.getPaiement(this.id);
    })
  }

  getPaiement(id: number){
    this.paiementScv.getPayments(id).subscribe({
      next: (res: any) =>{
        this.paiement = res.paiement;
        this.carte = res.carte;
        this.facture = res.facture;
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
   showPanel(){
    this.showAdd = true;
  }
  closePanel(){
    this.showAdd = false;
  }

  onEdit(pay: any){
    this.paiement = pay;
    this.showPanel();
  }
  onUpdate(pay: any){
    this.paiementScv.updatePayment(pay).subscribe({
      next: (res: any)=> {
        alert('Modification effectué !');
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
}
