import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              public fireStore: AngularFirestore) { }

  initAuthListener(){ // El listener se va a encargar de avisar si hay cambios en la autenticación
    this.auth.authState.subscribe( fbUser => {
      console.log(fbUser);
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    /* console.log(nombre, email, password); */
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then( ({user}) => {
      const newUser = new Usuario( user.uid, nombre, user.email )
     return  this.fireStore.doc(`${user.uid}/usuario`)
      .set({...newUser})
     /*  .then() */
    } )
  }

  loguearUsuario(email: string, password: string) {
    /* console.log(nombre, email, password); */
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
     map( fbUser => fbUser != null) /*  es una condición boolean que si son diferentes va a regresar un true y si son iguales un false */
    ); /* En este caso si existe regresa un true y si no existe un falso */
  }
}