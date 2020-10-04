import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styles: [
  ]
})
export class SiderbarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  userSubs: Subscription;

  constructor(private _authService: AuthService,
    private _router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter( ({user}) => user != null )
    )
      .subscribe( ({ user }) => {
        this.nombre = user.nombre
      });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  logOut() {
    this._authService.logOut().then(() => {
      this._router.navigate(['/login']);
    })
  }
}
