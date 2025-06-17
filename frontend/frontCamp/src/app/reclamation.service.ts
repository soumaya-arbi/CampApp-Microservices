import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reclamation } from './reclamation.model';
import { AuthService } from './auth.service';
import { User } from './reclamation.model';
import { Reponse } from './reponse.model';
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8085/campApp/api/reclamations';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  
  
    addReclamation(reclamation: Reclamation): Observable<any> {
      const user = this.authService.getLoggedInUser();
      if (user && user.token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${user.token}`);
        reclamation.user = { id: user.id! } as User; // Assurez-vous que l'utilisateur a un ID avant de l'utiliser
        return this.http.post(`${this.apiUrl}/add-reclamation`, reclamation, { headers });
      } else {
        return throwError('User not authenticated');
      }
    }
  

    getAllReclamations(): Observable<Reclamation[]> {
      return this.http.get<Reclamation[]>(`${this.apiUrl}`);
    }
  
    deleteReclamation(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
    updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
      return this.http.put<Reclamation>(`${this.apiUrl}/modify-reclamation`, reclamation);
    }
  countReclamationsBySujet(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/count-by-sujet`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  filterReclamationsByDay(date: Date): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/filtre?date=${date.toISOString()}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getReclamationsCountByMonth(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/count-by-month`);
  }
  countReclamationsByYear(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/count-by-year`);
  }

  getReclamationsByYear(year: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/by-year/${year}`);
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
 
  
 
}
