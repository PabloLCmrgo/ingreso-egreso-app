import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  loguearUsuario() {
    if (this.loginForm.invalid) { return }

    Swal.fire({
      title: 'Espere por favor',
      willOpen: () => {
        Swal.showLoading()
      }
    });

    const { email, password } = this.loginForm.value;
    this._authService.loguearUsuario(email, password)
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
