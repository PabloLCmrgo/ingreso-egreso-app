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
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule,
    ChartsModule
  ],
  exports: [OrdenIngresoPipe]
})
export class IngresoEgresoModule { }
