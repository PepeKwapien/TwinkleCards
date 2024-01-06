import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { UserComponent } from './components/user/user.component';

@NgModule({
    declarations: [AppComponent, UserComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        provideFirebaseApp(() =>
            initializeApp({
                projectId: 'twinklecards-3108d',
                appId: '1:502197504510:web:ed0ff7729cf8a07fe458af',
                storageBucket: 'twinklecards-3108d.appspot.com',
                apiKey: 'AIzaSyBzEET_BxWwGhzrnZR5xAMin2D7LRlYEg8',
                authDomain: 'twinklecards-3108d.firebaseapp.com',
                messagingSenderId: '502197504510'
            })
        ),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

