import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _authService: AuthService,
                private _router: Router ){}

  canActivate(): Observable<boolean> {
    return this._authService.isAuth()
    .pipe(
      tap( estado => {
        if(!estado){ this._router.navigate(['/login']); }
      } ) /* Para disparar un efecto secundario */
    )
  }
  
}
