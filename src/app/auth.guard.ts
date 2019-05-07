import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Router } from '@angular/router'
import { AuthenticationService } from './services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(public router: Router, public authorizationService: AuthenticationService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('access_token')==null){
      this.router.navigate(['forebidden']);
      return false;
    }else{
      return true;
    }
  }
}
