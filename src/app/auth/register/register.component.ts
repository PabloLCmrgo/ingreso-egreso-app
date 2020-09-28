import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from 'src/app/shared/iu.actions';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui =>
      this.cargando = ui.isLoading);
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }
  crearUsuario() {
    if (this.registroForm.invalid) { return }
    this.store.dispatch(ui.isLoading());
    /*    Swal.fire({
      title: 'Espere por favor',
      willOpen: () => {
        Swal.showLoading()
      }
    }); */

    const { nombre, correo, password } = this.registroForm.value;
    this._authService.crearUsuario(nombre, correo, password)
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
