import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// modulos 
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ChartsModule } from 'ng2-charts';

// NgRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { OrdenIngresoPipe } from './pipes/orden-ingreso.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrdenIngresoPipe,
    
  ],
  imports: [
    ChartsModule,
    BrowserModule,

    AuthModule,

    AppRoutingModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  exports:[OrdenIngresoPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
