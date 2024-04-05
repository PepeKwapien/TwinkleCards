import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ModalOverlayComponent } from './components/modal-overlay/modal-overlay.component';
import { LoadingModule } from './modules/loading/loading.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoadingGuardComponent } from './components/user-loading-guard/user-loading-guard.component';
import { CollectionComponent } from './components/collection/collection.component';
import { DefinitionFlashcardFormComponent } from './components/flashcard-form/definition-flashcard-form/definition-flashcard-form.component';
import { MatchHeightDirective } from './directives/matchHeight/match-height.directive';
import { FlashcardFormComponent } from './components/flashcard-form/flashcard-form.component';
import { CreateDefinitionFlashcardFormComponent } from './components/flashcard-form/definition-flashcard-form/create-definition-flashcard-form/create-definition-flashcard-form.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        NavbarComponent,
        LandingPageComponent,
        ModalOverlayComponent,
        UserLoadingGuardComponent,
        CollectionComponent,
        DefinitionFlashcardFormComponent,
        MatchHeightDirective,
        FlashcardFormComponent,
        CreateDefinitionFlashcardFormComponent
    ],
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
        provideFirestore(() => getFirestore()),
        LoadingModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
