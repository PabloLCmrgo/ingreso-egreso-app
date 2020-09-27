import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styles: [
  ]
})
export class SiderbarComponent implements OnInit {

  constructor(private _authService: AuthService,
              private _router: Router ) { }

  ngOnInit(): void {
  }
logOut(){
  this._authService.logOut().then(() => {
    this._router.navigate(['/login']);
  })
}
}
