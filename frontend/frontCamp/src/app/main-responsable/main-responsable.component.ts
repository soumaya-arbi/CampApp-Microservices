// main-responsable.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReservationService } from '../reservation/reservation.service';
import { CentreService } from '../centre.service';
import { StatisticsService } from '../statistcs.service';

@Component({
  selector: 'app-main-responsable',
  templateUrl: './main-responsable.component.html',
  styleUrls: ['./main-responsable.component.css'],
})
export class MainResponsableComponent implements OnInit {
  loggedInUser: any;
  centresCount: number = 0;
  centresDeCamping: any[] = [];
  statistics: { [key: number]: any } = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private reservationService: ReservationService,
    private centreService: CentreService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();

    if (this.loggedInUser && this.loggedInUser.centreId) {
      this.loadRecentReservations(this.loggedInUser.centreId);
    } else {
      console.error('User not logged in or no centre ID found');
    }

    this.loadCentresDeCamping();
    this.getCentresCount();
  }
  yAxisLabels: string[] = ['0', '5', '10', '15', '20'];
  loadCentresDeCamping(): void {
    this.authService.getUserId().subscribe((utilisateurId: number | null) => {
      if (utilisateurId !== null) {
        this.centreService
          .getCentresDeCampingByUtilisateurId(utilisateurId)
          .subscribe(
            (data) => {
              this.centresDeCamping = data;
              this.loadStatisticsForCentres();
            },
            (error) => {
              console.error('Error fetching centres de camping', error);
            }
          );
      }
    });
  }

  loadStatisticsForCentres(): void {
    this.centresDeCamping.forEach((centre) => {
      this.statisticsService.getStatisticsByCentreId(centre.idCentre).subscribe(
        (stats) => {
          this.statistics[centre.idCentre] = stats;
        },
        (error) => {
          console.error('Error loading statistics:', error);
        }
      );
    });
  }

  getCentresCount(): void {
    this.centreService
      .countCentresByUtilisateurId(this.loggedInUser.id)
      .subscribe((count) => {
        this.centresCount = count;
      });
  }

  loadRecentReservations(centreId: number): void {
    this.reservationService.getRecentReservations(centreId).subscribe(
      (data) => {
        console.log('Recent reservations:', data);
      },
      (error) => {
        console.error('Error fetching recent reservations', error);
      }
    );
  }

  generateBarHeightStyle(centreIndex: number): string {
    const reservations =
      this.statistics[this.centresDeCamping[centreIndex]?.idCentre]
        ?.reservations || 0;
    return `height: ${reservations}px;`;
  }
  generateColor(centreId: number): string {
    // Fonction pour générer une couleur en fonction de l'ID du centre
    const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8']; // Liste de couleurs pré-définies
    const index = centreId % colors.length; // Utilisation d'un modulo pour obtenir un index dans la liste
    return colors[index]; // Retourne la couleur correspondante
  }
  getMaxReservations(): number {
    let maxReservations = 0;
    for (const centre of this.centresDeCamping) {
      const reservations = this.statistics[centre.idCentre]?.reservations || 0;
      if (reservations > maxReservations) {
        maxReservations = reservations;
      }
    }
    return maxReservations;
  }
}
