import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, NextOrObserver, User, UserCredential, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserRepositoryService } from '../user-repository/user-repository.service';
import { UserDocument } from 'src/app/models/documents/user.document';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user: User | null;
    private _firebaseUserSubject: BehaviorSubject<UserDocument | undefined>;

    public get username(): string {
        return this._user?.displayName ?? 'Unknown';
    }

    public get isUserAuthenticated(): boolean {
        return this._user !== null;
    }

    public get firebaseUser$(): Observable<UserDocument> {
        return this._firebaseUserSubject.asObservable().pipe(filter((user) => user !== undefined)) as Observable<UserDocument>;
    }

    constructor(private _auth: Auth, private _router: Router, private _userRepository: UserRepositoryService) {
        this._user = this._auth.currentUser;
        this._firebaseUserSubject = new BehaviorSubject<UserDocument | undefined>(undefined);
        this._auth.onAuthStateChanged(async (user) => {
            this._user = user;
            if (user !== null) {
                this._userRepository.userId = user.uid;
                await this._updateUserCollection(user);
            }
        });
    }

    public registerOnAuthStateChanged(nextOrObserver: NextOrObserver<User | null>) {
        this._auth.onAuthStateChanged(nextOrObserver);
    }

    public async signWithGooglePopup(): Promise<UserCredential> {
        const googleProvider = new GoogleAuthProvider();

        return await signInWithPopup(this._auth, googleProvider);
    }

    public async signOut(): Promise<void> {
        await signOut(this._auth);
        this._router.navigate(['']);
    }

    private async _updateUserCollection(user: User): Promise<void> {
        let userDocument = await this._userRepository.getUser();
        if (!userDocument) {
            await this._userRepository.upsertUser(UserDocument.FromFirebaseUser(user));
            userDocument = await this._userRepository.getUser();
        } else {
            await this._userRepository.updateLastLogin();
        }

        this._firebaseUserSubject.next(userDocument);
    }
}
