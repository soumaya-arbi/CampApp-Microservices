import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface UpdateResponse {
  success: boolean;
  message: string;
  updatedUser?: any;
}

interface AuthenticationResponse {
  token: string;
  message: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  id: number; // Ajout de l'ID de l'utilisateur
}

interface User {
  id?: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/campApp';

  constructor(private http: HttpClient) {}

  signin(user: User): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/login`, user)
      .pipe(
        tap((response) => {
          if (
            response &&
            response.token &&
            response.username &&
            response.firstName &&
            response.lastName &&
            response.role &&
            response.id // Assurez-vous que l'ID de l'utilisateur est inclus
          ) {
            const loggedInUser: User = {
              id: response.id, // Stocker l'ID de l'utilisateur
              username: response.username,
              password: user.password,
              firstName: response.firstName,
              lastName: response.lastName,
              role: response.role,
              token: response.token,
            };
            this.setLoggedInUser(loggedInUser);
          }
        })
      );
  }

  public setLoggedInUser(user: User): void {
    localStorage.setItem('username', user.username);
    localStorage.setItem('firstName', user.firstName!);
    localStorage.setItem('lastName', user.lastName!);
    localStorage.setItem('role', user.role!);
    localStorage.setItem('password', user.password);
    localStorage.setItem('token', user.token!);

    // Ajoutez une vérification ici pour vous assurer que l'ID existe avant de le convertir en chaîne
    if (user.id !== undefined && user.id !== null) {
      localStorage.setItem('id', user.id.toString());
    }
  }

  getLoggedInUser(): User | null {
    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const role = localStorage.getItem('role');
    const password = localStorage.getItem('password');
    const token = localStorage.getItem('token');

    if (id && username && firstName && lastName && password && role && token) {
      return {
        id: +id, // Convertir l'ID de string à number
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        role: role,
        token: token,
      };
    }
    return null;
  }

  getUserId(): Observable<number | null> {
    const loggedInUser = this.getLoggedInUser();
    if (loggedInUser) {
      return of(loggedInUser.id || null);
    }
    return of(null);
  }

  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('role');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
  }

  signup(user: User): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.apiUrl}/register`,
      user
    );
  }

  isLoggedIn(): Observable<boolean> {
    const loggedInUser = this.getLoggedInUser();
    return of(!!loggedInUser);
  }

  updateUserProfile(updatedUser: any): Observable<UpdateResponse> {
    return this.http.put<UpdateResponse>(
      `${this.apiUrl}/updateProfile`,
      updatedUser
    );
  }
  resetPassword(username: string, newPassword: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/reset-password`,
        { username, newPassword },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          observe: 'response',
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error in resetPassword:', error); // Debug
          throw error;
        })
      );
  }
}
