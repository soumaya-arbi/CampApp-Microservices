import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CentreService } from '../centre.service';
import { StatisticsService } from '../statistcs.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  loggedInUser: any;
  centresDeCamping: any[] = [];
  currentIndex = 0;
  public centreId: number | null = null;
  chartData: { name: string; percentage: number }[] = [];
  totalReservations = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private centreDeCampingService: CentreService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.loadCentresDeCamping();
    this.statisticsService.getCentreWithMostReservations().subscribe((data) => {
      this.centreId = data;
    });
    this.statisticsService.getReservationPercentages().subscribe((data) => {
      this.chartData = Object.keys(data).map((key) => ({
        name: key,
        percentage: data[key],
      }));
      this.totalReservations = this.chartData.reduce(
        (total, item) => total + item.percentage,
        0
      );
    });
  }

  loadCentresDeCamping(): void {
    this.authService
      .getUserId()
      .pipe(
        switchMap((utilisateurId: number | null) => {
          if (utilisateurId === null) {
            return of([]);
          } else {
            return this.centreDeCampingService.getCentresDeCamping();
          }
        })
      )
      .subscribe((data) => {
        this.centresDeCamping = data;
        console.log('Centres de camping chargés : ', this.centresDeCamping);
        console.log('Current index : ', this.currentIndex);
      });
  }

  getPercentage(value: number): number {
    if (this.totalReservations === 0) return 0;
    return (value / this.totalReservations) * 100;
  }

  getBarColor(index: number): string {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#cca9dd', '#77DD77'];
    return colors[index % colors.length];
  }

  nextSlide(): void {
    if (this.currentIndex < this.centresDeCamping.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    console.log('Current index after nextSlide: ', this.currentIndex);
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.centresDeCamping.length - 1;
    }
    console.log('Current index after prevSlide: ', this.currentIndex);
  }

  goBack(): void {
    this.router.navigate(['/mainresponsable']);
  }

  affecterFeedback(centreId: number): void {
    if (centreId) {
      this.router.navigate(['/list-feed', centreId]);
    } else {
      console.error('ID du centre indéfini');
    }
  }
  affecteractivite(centreId: number): void {
    if (centreId) {
      this.router.navigate(['/activite-list', centreId]);
    } else {
      console.error('ID du centre indéfini');
    }
  }
}
