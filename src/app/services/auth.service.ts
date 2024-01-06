import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, UserCredential, signInWithPopup, signOut } from '@angular/fire/auth';

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

    constructor(private _auth: Auth) {
        this._user = this._auth.currentUser;
        this._auth.onAuthStateChanged((user) => (this._user = user));
    }

    public async signWithGooglePopup(): Promise<UserCredential> {
        const googleProvider = new GoogleAuthProvider();

        return await signInWithPopup(this._auth, googleProvider);
    }

    public async signOut() {
        await signOut(this._auth);
    }
}

