import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  centreId: number = 0;
  reservations: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.centreId = +params['centreId']; // Le signe + convertit en number
      this.loadReservations(this.centreId);
    });
  }

  loadReservations(centreId: number): void {
    this.reservationService.getRecentReservations(centreId).subscribe(
      (data) => {
        this.reservations = data;
        console.log('Reservations:', this.reservations);
      },
      (error) => {
        console.error('Error fetching reservations', error);
      }
    );
  }
  acceptReservation(reservationId: number) {
    this.reservationService.acceptReservation(reservationId).subscribe(() => {
      this.loadReservations(this.centreId); // Recharger les réservations après acceptation
    });
  }

  rejectReservation(reservationId: number) {
    this.reservationService.rejectReservation(reservationId).subscribe(() => {
      this.loadReservations(this.centreId); // Recharger les réservations après refus
    });
  }
}
