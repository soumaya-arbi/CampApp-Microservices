import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipement } from './Models/Equipement';

@Injectable({
  providedIn: 'root',
})
export class EquipementService {
  private baseUrl = 'http://localhost:8085/campApp/equipements';

  constructor(private http: HttpClient) {}

  getEquipementsByCentreId(centreId: number): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`${this.baseUrl}/centre/${centreId}`);
  }

  updateEquipement(
    idEquipement: number,
    equipement: Equipement
  ): Observable<Equipement> {
    return this.http.put<Equipement>(
      `${this.baseUrl}/${idEquipement}`,
      equipement
    );
  }

  deleteEquipement(idEquipement: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idEquipement}`);
  }
  addEquipement(equipement: Equipement, centreId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${centreId}`, equipement);
  }
}
