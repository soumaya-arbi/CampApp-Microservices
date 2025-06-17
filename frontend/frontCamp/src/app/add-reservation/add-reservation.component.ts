import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReservationService } from '../reservation/reservation.service';
import { AuthService } from '../auth.service';
import { Reservation } from '../Models/reservation';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
})
export class AddReservationComponent implements OnInit {
  availableLocations: string[] = [];
  availableCentres: any[] = [];
  step: number = 1;
  selectedCentre: any;
  selectedAccommodation: any;
  availableAccommodations: any[] = [];
  arrivalDate: string = '';
  departureDate: string = '';
  nbrPersonne: number = 0;
  selectedLocation: string = '';
  userId: number | null = null;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocations();
    this.authService.getUserId().subscribe((userId) => {
      if (userId) {
        this.userId = userId;
        console.log('User ID set:', this.userId);
      } else {
        console.error('User ID is invalid');
      }
    });
  }

  loadLocations() {
    this.reservationService.getAllLieux().subscribe((locations) => {
      this.availableLocations = locations;
    });
  }

  loadCentresByLocation() {
    this.reservationService
      .getCentresByLocation(this.selectedLocation)
      .subscribe((centres) => {
        this.availableCentres = centres;
      });
  }

  loadAccommodationsByCentre() {
    if (this.selectedCentre && typeof this.selectedCentre.idCentre === 'number') {
      const centreId = this.selectedCentre.idCentre;
  
      this.reservationService.getAccommodationsByCentre(centreId).subscribe(
        (accommodations) => {
          this.availableAccommodations = accommodations;
          console.log('Hébergements chargés:', this.availableAccommodations);
        },
        (error) => {
          console.error('Erreur lors du chargement des hébergements :', error);
        }
      );
    } else {
      console.error('Selected centre is not valid');
    }
  }
  

  nextStep() {
    if (this.step < 4) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  submitReservation() {
    if (!this.selectedCentre) {
      console.error('Centre or accommodation or user ID is not selected');
      return;
    }

    const centreId = this.selectedCentre.idCentre;
    const accommodationId = this.selectedAccommodation.idHebergement;

    const reservation: Reservation = {
      dateArrivee: new Date(this.arrivalDate),
      dateSortie: new Date(this.departureDate),
      nbrPersonne: this.nbrPersonne,
      lieux: this.selectedLocation,
      idHebergement: accommodationId,
      idCentre: centreId,
      status: 'pending',
    };

    console.log('Submitting reservation:', reservation);

    Swal.fire({
      text: 'Vous voulez confirmer cette réservation?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/reservation']);
        this.reservationService.addReservation(reservation).subscribe(() => {});
      }
    });
  }
}
