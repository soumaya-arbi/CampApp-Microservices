import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Activite } from './activite.model';
import { AuthService } from './auth.service';
import { User } from './Models/user';
@Injectable({
  providedIn: 'root',
})
export class ActiviteService {
  private apiUrl = 'http://localhost:8085/campApp/api/activites';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  addActivite(activite: Activite): Observable<any> {
    const user = this.authService.getLoggedInUser();
    if (user && user.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${user.token}`
      );
      return this.http
        .post(`${this.apiUrl}/add-activite`, activite, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('User not authenticated');
    }
  }
  getAllActivites(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.apiUrl);
  }
  deleteActivite(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  modifyActivite(activite: Activite): Observable<Activite> {
    const user = this.authService.getLoggedInUser();
    if (user && user.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${user.token}`
      );
      return this.http
        .put<Activite>(`${this.apiUrl}/modify-activite`, activite, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('User not authenticated');
    }
  }
  getActivitesByCentreId(centreId: number): Observable<Activite[]> {
    return this.http
      .get<Activite[]>(`${this.apiUrl}/${centreId}`)
      .pipe(catchError(this.handleError));
  }
}
