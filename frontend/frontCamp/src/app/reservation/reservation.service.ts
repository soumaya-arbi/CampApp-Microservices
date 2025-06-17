import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Reservation } from '../reservation.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8081/reservations';
  private cUrl = 'http://localhost:8081/centresdecamping';
  private eUrl = 'http://localhost:8085/campApp/equipements';
  private hUrl = 'http://localhost:8081/hebergements';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}`);
  }

  getReservationsByCurrentUser(): Observable<Reservation[]> {
    return this.authService.getUserId().pipe(
      switchMap((userId: number | null) => {
        if (userId) {
          return this.http.get<Reservation[]>(`${this.apiUrl}/user/${userId}`);
        } else {
          throw new Error('User ID not available');
        }
      })
    );
  }

  getReservationsByUserId(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/user/${userId}`);
  }

  getReservation(reservationId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/getbyid/${reservationId}`);
  }

  addReservation(reservation: Partial<Reservation>): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}`, reservation);
  }

  deleteReservation(reservationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reservationId}`);
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}`, reservation);
  }

  cancelReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cancel/${id}`, { responseType: 'text' });
  }

  getAllLieux(): Observable<string[]> {
    return this.http.get<string[]>(`${this.cUrl}/lieux`);
  }

  getCentresByLocation(location: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.cUrl}/centres/${location}`);
  }

  getEquipmentsByCentre(centreId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.eUrl}/equipements?centreId=${centreId}`);
  }

  getAccommodationsByCentre(centreId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.hUrl}/centre/${centreId}`);
  }

  getAccommodationsByCentreAndCapacity(centreId: number, capacity: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.hUrl}/hebergement?centreId=${centreId}&capacity=${capacity}`);
  }

  getReservationById(reservationId: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/getbyid/${reservationId}`);
  }

  updateReservationDates(reservationId: number, arrivalDate: Date, departureDate: Date): Observable<any> {
    const params = new URLSearchParams({
      dateArrivee: arrivalDate.toISOString().split('T')[0],
      dateSortie: departureDate.toISOString().split('T')[0],
    });
    return this.http.put<any>(`${this.apiUrl}/${reservationId}?${params}`, {});
  }

  getRecentReservations(centreId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recent-reservations/${centreId}`);
  }

  acceptReservation(reservationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reservationId}/accept`, {});
  }

  rejectReservation(reservationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reservationId}/reject`, {});
  }
}
