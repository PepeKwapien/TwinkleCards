import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, NextOrObserver, User, UserCredential, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user: User | null;

    public get username(): string {
        return this._user?.displayName ?? 'Unknown';
    }

    public get isUserAuthenticated(): boolean {
        return this._user !== null;
    }

    public registerOnAuthStateChanged(nextOrObserver: NextOrObserver<User | null>) {
        this._auth.onAuthStateChanged(nextOrObserver);
    }

    constructor(private _auth: Auth, private _router: Router) {
        this._user = this._auth.currentUser;
        this._auth.onAuthStateChanged((user) => (this._user = user));
    }

    public async signWithGooglePopup(): Promise<UserCredential> {
        const googleProvider = new GoogleAuthProvider();

        return await signInWithPopup(this._auth, googleProvider);
    }

    public async signOut() {
        await signOut(this._auth);
        this._router.navigate(['']);
    }
}
