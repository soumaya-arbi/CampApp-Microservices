import { Component, OnInit } from '@angular/core';
import { ReservationService } from './reservation.service';
import { Reservation } from '../reservation.model';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  public reservations: Reservation[] = [];
  public paginatedReservations: Reservation[] = [];
  public userId: number | null = null;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  reservation: Reservation | undefined;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserId().subscribe(
      (userId: number | null) => {
        if (userId !== null) {
          this.userId = userId;
          this.loadReservations();
        } else {
          console.error('User ID not available');
        }
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );
  }
  editReservation(reservationId: number) {
    this.router.navigate(['/modify-reservation', reservationId]);
  }
  loadReservations(): void {
    if (this.userId !== null) {
      this.reservationService.getReservationsByUserId(this.userId).subscribe(
        (reservations: Reservation[]) => {
          this.reservations = reservations;
          this.totalPages = Math.ceil(
            this.reservations.length / this.itemsPerPage
          );
          this.updatePaginatedReservations();
        },
        (error) => {
          console.error('Error fetching reservations:', error);
        }
      );
    }
  }

  updatePaginatedReservations(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReservations = this.reservations.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedReservations();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedReservations();
    }
  }

  cancelReservation(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, annulez-le!',
      cancelButtonText: 'Non, gardez-le',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.cancelReservation(id).subscribe(
          (response) => {
            this.showNotification('success');
            this.loadReservations(); // Recharger la liste des réservations après l'annulation
          },
          (error) => {
            this.showNotification('error');
          }
        );
      }
    });
  }

  showNotification(type: 'success' | 'error'): void {
    const notification = document.getElementById(`${type}-notification`);
    if (notification) {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000); // Masquer la notification après 3 secondes
    }
  }
  loadReservationData(reservationId: number) {
    this.reservationService.getReservationById(reservationId).subscribe(
      (data: Reservation) => {
        this.reservation = data;
      },
      (error) => {
        console.error('Error fetching reservation', error);
      }
    );
  }
  getStatusCircleClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-circle circle-pending';
      case 'accepted':
        return 'status-circle circle-accepted';
      case 'rejected':
        return 'status-circle circle-rejected';
      case 'annulée':
        return 'status-circle circle-annulée';
      default:
        return 'status-circle';
    }
  }
}
