import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order-service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashbord',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css'
})
export class Dashbord implements OnInit{
  // 1. Chiffre d'affaire par mois
  monthlyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Chiffre d\'affaire mensuel (FCFA)' }]
  };
  monthlyChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };

  // 2. Chiffre d'affaire par année
  yearlyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Chiffre d\'affaire annuel (FCFA)' }]
  };
  yearlyChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };

  // 3. Produits les plus vendus
  productChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }]
  };
  productChartOptions: ChartConfiguration<'pie'>['options'] = { responsive: true };

  constructor(private statsService: OrderService) {}

  ngOnInit(): void {
    this.statsService.getStats().subscribe((res: any) => {
      // Chiffre d'affaire par mois
      const moisNoms = [
              'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
              'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
            ];       // Chiffre d'affaires par mois
       this.monthlyChartData = {
          labels: res.par_mois.map((item: any) => moisNoms[item.mois - 1]),
          datasets: [{
            label: 'Chiffre d\'Affraire mensuel (FCFA)',
            data: res.par_mois.map((item: any) => parseFloat(item.total)),
          }]
        };

      // Chiffre d'affaires par année
      this.yearlyChartData = {
        labels: res.par_annee.map((item: any) => item.annee.toString()),
        datasets: [{
          label: 'Chiffre d\'affaire Annuel (FCFA)',
          data: res.par_annee.map((item: any) => parseFloat(item.total)),
        }]
      }

      this.productChartData = {
        labels: res.produits.map((item: any) => item.nom),
        datasets: [{
          label: 'Produits les plus vendus',
          data: res.produits.map((item: any) => parseInt(item.total_vendus)),
          backgroundColor: this.generateColors(res.produits.length),
          borderWidth: 1
        }]
      };
    });
  }

  chartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12
            }
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 12
            }
          }
        }
      }
  };

  generateColors(count: number): string[] {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#C9CBCF', '#7C4DFF',
      '#00E676', '#D500F9', '#FF6F00', '#1E88E5'
    ];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  }



}
