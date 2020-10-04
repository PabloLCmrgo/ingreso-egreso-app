import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso })
  }

  initIngresosEgresosListener(uid: String) {
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges() // Obtiene los metadatos
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as {}
        })
        )
        )
      )
  }

  borrarIngresoEgreso(uidItem:string){
    const uid = this.authService.user.uid;
   return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }

}
      /* map( snapshot => {    ESTA ES LA FORMA LARGA
return snapshot.map( doc => {
// const data:{} = doc.payload.doc.data();
return {
uid: doc.payload.doc.id,
...doc.payload.doc.data() as {}
}
} )
} ) */