import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Forum } from './forum.model';
import { AuthService } from './auth.service';
import { User } from './Models/user';
import { Reponse } from './reponse.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:8085/campApp/api/forums';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  addForum(forum: Forum): Observable<any> {
    const user = this.authService.getLoggedInUser();
    if (user && user.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${user.token}`);
      forum.user = { id: user.id! } as User; // Ensure the user has an ID before using it
      return this.http.post(`${this.apiUrl}/add-forum`, forum, { headers })
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return throwError('User not authenticated');
    }
  }

  getAllForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteForum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateForum(forum: Forum): Observable<Forum> {
    return this.http.put<Forum>(`${this.apiUrl}/modify-forum`, forum, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
