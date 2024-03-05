import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, NextOrObserver, User, UserCredential, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserRepositoryService } from '../user-repository/user-repository.service';
import { UserDocument } from 'src/app/models/documents/user.document';
import { Observable, filter } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user: User | null;

    public get userId(): string {
        return this._user?.uid ?? 'Unknown';
    }

    public get username(): string {
        return this._user?.displayName ?? 'Unknown';
    }

    public get isUserAuthenticated(): boolean {
        return this._user !== null;
    }

    public get user$(): Observable<UserDocument> {
        return this._userRepository.user$.pipe(filter((user) => user !== undefined)) as Observable<UserDocument>;
    }

    constructor(private _auth: Auth, private _router: Router, private _userRepository: UserRepositoryService) {
        this._user = this._auth.currentUser;
        this._auth.onAuthStateChanged(async (user) => {
            this._user = user;
            if (user !== null) {
                await this._setupUser(user);
            } else {
                this._userRepository.clearUser();
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

    private async _setupUser(user: User): Promise<void> {
        const userId = user.uid;
        const userDocument = await this._userRepository.getUser(userId);
        if (!userDocument) {
            await this._userRepository.upsertUser(userId, UserDocument.FromFirebaseUser(user));
        } else {
            await this._userRepository.updateLastLogin(userId);
        }

        this._userRepository.setupUserChanges(userId);
    }
}
