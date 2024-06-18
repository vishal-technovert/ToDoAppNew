import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}Auth`;
  public tokenKey = 'auth-token';
  public usernameKey = 'username';

  constructor(private http: HttpClient) { }

  authenticationChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.usernameKey, username);
        this.authenticationChanged.emit(true);
      }),
      map(() => true),
      catchError(() => {
        this.authenticationChanged.emit(false);
        return of(false);
      })
    );
  }

  signUp(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signup`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.usernameKey, username);
        this.authenticationChanged.emit(true);
      }),
      map(() => true),
      catchError(() => {
        this.authenticationChanged.emit(false);
        return of(false);
      })
    );
  }
  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }


 
}


