import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback } from './feedback.model';
import { AuthService } from './auth.service';
import { User } from './Models/user';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8085/campApp/api/feedbacks';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  addFeedback(feedback: Feedback, centreId: number): Observable<any> {
    const user = this.authService.getLoggedInUser();
    if (user && user.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${user.token}`
      );

      feedback.user = { id: user.id! } as User; // Ensure the user has an ID before using it
      feedback.centreId = centreId; // Assign the centreId to the feedback

      return this.http
        .post(`${this.apiUrl}/add/${centreId}`, feedback, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('User not authenticated');
    }
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http
      .get<Feedback[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError));
  }

  deleteFeedback(id: number): Observable<void> {
    const user = this.authService.getLoggedInUser();
    if (user && user.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${user.token}`
      );
      return this.http
        .delete<void>(`${this.apiUrl}/${id}`, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('User not authenticated');
    }
  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    const user = this.authService.getLoggedInUser();
    if (user && user.token) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${user.token}`
      );
      return this.http
        .put<Feedback>(`${this.apiUrl}/modify-feedback`, feedback, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return throwError('User not authenticated');
    }
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
  getFeedbacksByCentreId(centreId: number): Observable<Feedback[]> {
    return this.http
      .get<Feedback[]>(`${this.apiUrl}/${centreId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  getFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`);
  }
}
