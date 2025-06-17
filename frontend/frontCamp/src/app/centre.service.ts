import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentreDeCamping } from './Models/CentreDeCamping';

@Injectable({
  providedIn: 'root',
})
export class CentreService {
  private baseUrl = 'http://localhost:8081/reservation-microservice/centresdecamping'; // Base URL du back-end

  constructor(private http: HttpClient) {}

  createCentreDeCamping(
    centreDeCamping: CentreDeCamping,
    utilisateurId: number
  ): Observable<CentreDeCamping> {
    const params = new HttpParams().set(
      'utilisateurId',
      utilisateurId.toString()
    );
    return this.http.post<CentreDeCamping>(this.baseUrl, centreDeCamping, {
      params,
    });
  }
  getCentresDeCampingByUtilisateurId(utilisateurId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/centresdecamping`, {
      params: { utilisateurId: utilisateurId.toString() },
    });
  }
  getCentresDeCamping(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  countCentresByUtilisateurId(utilisateurId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countByUtilisateur`, {
      params: { utilisateurId: utilisateurId.toString() },
    });
  }
}
