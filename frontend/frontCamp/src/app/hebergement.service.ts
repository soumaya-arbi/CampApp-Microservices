// hebergement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hebergement } from './Models/Hebergement';

@Injectable({
  providedIn: 'root',
})
export class HebergementService {
  private apiUrl = 'http://localhost:8081/reservation-microservice/hebergements'; // Remplacez par votre URL API

  constructor(private http: HttpClient) {}

  getHebergementsByCentreId(centreId: number): Observable<Hebergement[]> {
    return this.http.get<Hebergement[]>(
      `${this.apiUrl}/hebergement/${centreId}`
    );
  }
  createHebergement(centreId: number, hebergement: any): Observable<any> {
    const url = `${this.apiUrl}/${centreId}`;
    return this.http.post(url, hebergement);
  }
  updateHebergement(
   
    hebergementId: number,
    hebergement: Hebergement
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${hebergementId}`,
      hebergement
    );
  }

  deleteHebergement( hebergementId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${hebergementId}`
    );
  }
}
