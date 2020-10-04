import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent
    //pipe
  ],
  imports: [
    CommonModule,
  /*   StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer) */
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule
    //ChartsModule
  ]
})
export class IngresoEgresoModule { }
