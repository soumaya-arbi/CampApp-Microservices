import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ReclamationService } from '../reclamation.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-reclamation-chart',
  templateUrl: './reclamation-chart.component.html',
  styleUrls: ['./reclamation-chart.component.css']
})
export class ReclamationChartComponent implements OnInit {
  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>; // Non-null assertion
  chart: any;

  constructor(private reclamationService: ReclamationService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.reclamationService.getReclamationsCountByMonth().subscribe(data => {
      const labels = Object.keys(data);
      const counts = Object.values(data).map(value => Number(value)); // Conversion en number

      this.createChart(labels, counts);
    });
  }

  createChart(labels: string[], counts: number[]): void {
    this.chart = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Réclamations par mois',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
