import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../reclamation.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PiechartComponent implements OnInit {

  constructor(private reclamationService: ReclamationService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.reclamationService.countReclamationsBySujet().subscribe(data => this.createChart(data));
  }

  createChart(data: Map<string, number>): void {
    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart("pieChart", {
      type: 'doughnut', // Change the chart type to 'doughnut'
      data: {
        labels: labels,
        datasets: [{
          label: '# of Reclamations',
          data: values,
          backgroundColor: [
            'rgba(34, 139, 34, 0.7)',   // Forest Green
            'rgba(139, 69, 19, 0.7)',   // Saddle Brown
            'rgba(70, 130, 180, 0.7)',  // Steel Blue
            'rgba(46, 139, 87, 0.7)',   // Sea Green
            'rgba(160, 82, 45, 0.7)',   // Sienna
            'rgba(218, 165, 32, 0.7)'   // Goldenrod
          ],
          borderColor: [
            'rgba(34, 139, 34, 1)',   // Forest Green
            'rgba(139, 69, 19, 1)',   // Saddle Brown
            'rgba(70, 130, 180, 1)',  // Steel Blue
            'rgba(46, 139, 87, 1)',   // Sea Green
            'rgba(160, 82, 45, 1)',   // Sienna
            'rgba(218, 165, 32, 1)'   // Goldenrod
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'index', intersect: false }
        }
      }
    });
  }
}
