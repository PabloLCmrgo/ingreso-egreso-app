import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  crearUsuario() {
    if (this.registroForm.invalid) { return }
    Swal.fire({
      title: 'Espere por favor',
      willOpen: () => {
        Swal.showLoading()
      }
    });

    const { nombre, correo, password } = this.registroForm.value;
    this._authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
        this._router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
