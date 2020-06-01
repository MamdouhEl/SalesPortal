import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate {
  constructor(private Auths: AuthService, private router: Router) {}
  canActivate (route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean |
   Promise<boolean> |
    Observable<boolean>  {
    const isAdmin = this.Auths.Adminuser;
    if (isAdmin) {
      return true;
    }
    this.routing();
    return false;
  }

  routing () {
    return this.router.navigate(['login']);
  }
}
