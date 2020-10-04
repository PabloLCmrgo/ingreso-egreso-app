import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SiderbarComponent } from './siderbar/siderbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SiderbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    SiderbarComponent
  ]
})
export class SharedModule { }
