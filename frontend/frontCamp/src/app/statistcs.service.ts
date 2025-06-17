import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private apiUrl =
    'http://localhost:8085/campApp/reservations/most-reservations-centre';
  private BaseUrl =
    'http://localhost:8085/campApp/reservations/reservation-percentages';
  private baseUrl =
    'http://localhost:8085/campApp/stat/statistics';

  constructor(private http: HttpClient) {}

  getCentreWithMostReservations(): Observable<number> {
    return this.http.get<number>(this.apiUrl);
  }
  getReservationPercentagesByCentre(): Observable<
    { name: string; percentage: number }[]
  > {
    return this.http.get<{ name: string; percentage: number }[]>(
      'http://localhost:8085/campApp/reservations/reservation-percentages'
    );
  }
  getReservationPercentages(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.BaseUrl);
  }
  getStatisticsByCentreId(centreId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${centreId}`);
  }
}
