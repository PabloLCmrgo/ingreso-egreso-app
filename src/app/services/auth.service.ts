import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user:Usuario;

  get user(){
    return this._user;
  }

  constructor(public auth: AngularFireAuth,
    public fireStore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() { // El listener se va a encargar de avisar si hay cambios en la autenticación
    this.auth.authState.subscribe(fbUser => {
      /*  console.log(fbUser?.uid); */
      if (fbUser) {
    this.userSubscription = this.fireStore.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
          /*   console.log(firestoreUser); */
            const user = Usuario.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this._user = null
        this.userSubscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(unSetItems());
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    /* console.log(nombre, email, password); */
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email)
        return this.fireStore.doc(`${user.uid}/usuario`)
          .set({ ...newUser })
        /*  .then() */
      })
  }

  loguearUsuario(email: string, password: string) {
    /* console.log(nombre, email, password); */
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null) /*  es una condición boolean que si son diferentes va a regresar un true y si son iguales un false */
    ); /* En este caso si existe regresa un true y si no existe un falso */
  }
}
