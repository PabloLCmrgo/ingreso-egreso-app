import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// modulos 
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

// NgRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
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
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
