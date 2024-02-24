import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, NextOrObserver, User, UserCredential, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserRepositoryService } from '../user-repository/user-repository.service';
import { UserDocument } from 'src/app/models/documents/user.document';

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

    constructor(private _auth: Auth, private _router: Router, private _userRepository: UserRepositoryService) {
        this._user = this._auth.currentUser;
        this._auth.onAuthStateChanged(async (user) => {
            this._user = user;
            if (user !== null) {
                await this._updateUserCollection(user);
            }
        });
    }

    public async signWithGooglePopup(): Promise<UserCredential> {
        const googleProvider = new GoogleAuthProvider();

        return await signInWithPopup(this._auth, googleProvider);
    }

    public async signOut() {
        await signOut(this._auth);
        this._router.navigate(['']);
    }

    private async _updateUserCollection(user: User) {
        let userDocument = await this._userRepository.getUser(user.uid);
        if (!userDocument) {
            await this._userRepository.upsertUser(user.uid, UserDocument.FromFirebaseUser(user));
            userDocument = await this._userRepository.getUser(user.uid);
        } else {
            await this._userRepository.updateLastLogin(user.uid);
        }
    }
}
