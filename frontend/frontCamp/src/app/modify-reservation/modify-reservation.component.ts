import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ReservationService } from '../reservation/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-reservation',
  templateUrl: './modify-reservation.component.html',
  styleUrls: ['./modify-reservation.component.css'],
})
export class ModifyReservationComponent implements OnInit {
  reservationId: number = 0;
  arrivalDate: string = '';
  departureDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.reservationId = id ? +id : 0;
      this.loadReservationDetails();
    });
  }

  loadReservationDetails(): void {
    this.reservationService
      .getReservationById(this.reservationId)
      .subscribe((reservation) => {
        this.arrivalDate = this.formatDate(reservation.dateArrivee);
        this.departureDate = this.formatDate(reservation.dateSortie);
      });
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  submitReservation(): void {
    const arrivalDate = new Date(this.arrivalDate);
    const departureDate = new Date(this.departureDate);

    if (!isNaN(arrivalDate.getTime()) && !isNaN(departureDate.getTime())) {
      this.reservationService
        .updateReservationDates(this.reservationId, arrivalDate, departureDate)
        .subscribe(
          () => {
            Swal.fire(
              'Succès',
              'Réservation mise à jour avec succès',
              'success'
            );
            this.router.navigate(['/reservation']);
          },
          (error) => {
            Swal.fire(
              'Erreur',
              'Erreur lors de la mise à jour de la réservation',
              'error'
            );
          }
        );
    } else {
      Swal.fire('Erreur', 'Veuillez sélectionner des dates valides.', 'error');
    }
  }
}
