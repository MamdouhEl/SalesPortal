import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Token } from '@angular/compiler';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  username: string;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private FailedauthStatusListener = new Subject<boolean>();
  private AdminStatusListener = new Subject<boolean>();
  public isAuthenticated = false;
  private tokenTimer: any;
  Adminuser: boolean;
  failedAuth = false;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getFailedAuthStatusListener() {
    return this.FailedauthStatusListener.asObservable();
  }

  getAdminStatusListener() {
    return this.AdminStatusListener.asObservable();
  }

  getIsAdmin() {
    return this.Adminuser;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  login(username: string, password: string) {
    this.username = username;
    let token = null;
    const authData: AuthData = {username: username, password: password};
    this.http.post<{token: string, expiresIn: number}>('http://dummy.com:3000/api/user/login', authData)
      .subscribe(response => {
        if (response.token) {
        token = response.token;
        this.token = token;
        }
        console.log(token);
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const now = new Date();
          const expirationDate = new Date (now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.http.get<{message: string, username: any}>('http://dummy.com:3000/api/admin/' + username)
            .subscribe((Admin) => {
              console.log(Admin);
              if (Admin != null) {
              this.Adminuser = true;
            } else {
              this.Adminuser = false;
            }
            console.log(this.Adminuser);
            this.saveAuthData(token, expirationDate, username, this.Adminuser);
      });
        if (!this.Adminuser) {
          this.saveAuthData(token, expirationDate, username, false);
        }

          this.router.navigate(['/']);
        }


      }, error => {
        this.failedAuth = true;
        this.authStatusListener.next(false);
        this.router.navigate(['/login']);
      });


  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.Adminuser = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, username: string, Adminuser: boolean) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
    console.log(this.Adminuser);
    localStorage.setItem('Adminuser', Adminuser.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('Adminuser');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {this.logout(); }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');
    const Adminuser = <any>localStorage.getItem('Adminuser');
    if (!token || !expirationDate || !username || !Adminuser) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      username: username,
      Adminuser: Adminuser
    };
  }

  autoAuthUser() {
    const AuthInformation = this.getAuthData();
    if (!AuthInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = AuthInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = AuthInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.username = AuthInformation.username;
      this.Adminuser = (AuthInformation.Adminuser === 'true');
      console.log(this.Adminuser);
      this.authStatusListener.next(true);
      this.AdminStatusListener.next(true);

    }
  }

}
