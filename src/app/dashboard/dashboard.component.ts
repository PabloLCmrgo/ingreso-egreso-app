import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
userSubs: Subscription;
ingresosSubs: Subscription;
  constructor(private store: Store<AppState>,
              private ingresoEgresService: IngresoEgresoService) { }

  ngOnInit(): void {
  this.userSubs = this.store.select('user').
    pipe(
      filter( auth => auth.user != null )
    )
    .subscribe(({user}) => {
    this.ingresosSubs = this.ingresoEgresService.initIngresosEgresosListener(user.uid)
      .subscribe( (ingresoEgresoFB:any) => {
        this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresoEgresoFB }) )
      } )
    });
  }

  ngOnDestroy(){
    this.ingresosSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

}
