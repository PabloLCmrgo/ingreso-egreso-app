import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/iu.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;
  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui =>
      this.cargando = ui.isLoading);
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  loguearUsuario() {
    if (this.loginForm.invalid) { return }

    this.store.dispatch(ui.isLoading());
    /*   Swal.fire({
        title: 'Espere por favor',
        willOpen: () => {
          Swal.showLoading()
        }
      }); */

    const { email, password } = this.loginForm.value;
    this._authService.loguearUsuario(email, password)
      .then(credenciales => {
        console.log(credenciales);
        /*   Swal.close(); */
        this.store.dispatch(ui.stopLoading());
        this._router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
