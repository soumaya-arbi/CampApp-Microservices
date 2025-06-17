import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reponse } from './reponse.model';
import { AuthService } from './auth.service';
import { User } from './Models/user';
import { Reclamation } from './reclamation.model'; // Assurez-vous d'importer Reclamation si nécessaire

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  private apiUrl = 'http://localhost:8085/campApp/api/reponses';

  constructor(private http: HttpClient, private authService: AuthService) { }

  addReponse(reponse: Reponse): Observable<any> {
    const user = this.authService.getLoggedInUser();
    if (user !== null) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${user.token}`);
      reponse.user = { id: user.id! } as User; // Utilisez l'ID de l'utilisateur pour la réponse
      return this.http.post(`${this.apiUrl}/add-reponse`, reponse, { headers })
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return throwError('User not authenticated');
    }
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}