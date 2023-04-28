import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstComponent } from './first/first.component';

import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'

import { FormsModule } from '@angular/forms'

import { config } from './config'
import { FirebaseAppModule, initializeApp, provideFirebaseApp } 
                                        from '@angular/fire/app'
import { StudentService } from './Services/student.service'
import { FirestoreModule } from '@angular/fire/firestore'

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(config.firebase)),
    FirebaseAppModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    FormsModule,

    FirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
