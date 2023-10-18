import { Injectable } from "@angular/core";
import { CredentialsDto } from "../dto/credentials.dto";
import { LoginResponseDto } from "../dto/login-response.dto";
import { HttpClient } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { BehaviorSubject, Observable, Subject, map, tap } from "rxjs";

export class User {
  constructor(public id = 0, public email = "") {}
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authSubject = new BehaviorSubject<User | null>(null);
  auth$ = this.authSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.auth$.pipe(
      map((user) => !!user && this.isAuthenticated())
    );
    this.isLoggedOut$ = this.auth$.pipe(map((user) => user == null));
    const user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      this.authSubject.next(parsedUser);
    }
  }
  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        const user = new User(response.userId, credentials.email);
        localStorage.setItem("token", response.id);
        localStorage.setItem("user", JSON.stringify(user));
        this.authSubject.next(user);
      })
    );
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authSubject.next(null);
  }
}
