import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgreso: IngresoEgresoService[] = [];
  ingresosSubs: Subscription;

  constructor(private store:Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
   this.ingresosSubs = this.store.select('ingresosEgresos')
    .subscribe((val: any) => this.ingresoEgreso = val.items)
  }

  ngOnDestroy(){
    this.ingresosSubs.unsubscribe();
  }

  borrar(uid:string){
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
    .catch( err =>  Swal.fire('Error', err.message, 'error'));
  }

}
