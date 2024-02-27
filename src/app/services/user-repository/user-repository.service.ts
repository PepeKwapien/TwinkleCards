import { Injectable, OnDestroy } from '@angular/core';
import { Firestore, Unsubscribe, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDocument } from 'src/app/models/documents/user.document';

@Injectable({
    providedIn: 'root'
})
export class UserRepositoryService implements OnDestroy {
    private _collectionName = 'users';
    private _db: Firestore;
    private _userSubject: BehaviorSubject<UserDocument | undefined>;
    private _userChangesUnsubscribe: Unsubscribe | undefined;

    public get user$(): Observable<UserDocument | undefined> {
        return this._userSubject.asObservable();
    }

    constructor(private _firestore: Firestore) {
        this._db = this._firestore;
        this._userSubject = new BehaviorSubject<UserDocument | undefined>(undefined);
    }

    ngOnDestroy(): void {
        if (this._userChangesUnsubscribe !== undefined) {
            this._userChangesUnsubscribe();
        }
    }

    async getUser(userId: string): Promise<UserDocument | undefined> {
        return (await getDoc(doc(this._db, this._collectionName, userId))).data() as UserDocument | undefined;
    }

    async upsertUser(userId: string, user: UserDocument) {
        return await setDoc(doc(this._db, this._collectionName, userId), { ...user });
    }

    async updateLastLogin(userId: string): Promise<void> {
        await updateDoc(doc(this._db, this._collectionName, userId), { lastLogin: new Date() });
    }

    async createCollectionGroup(userId: string, collectionGroupName: string): Promise<void> {
        await updateDoc(doc(this._db, this._collectionName, userId), {
            collectionGroups: arrayUnion({ name: collectionGroupName, colletions: [] as string[] })
        });
    }

    async setupUserChanges(userId: string) {
        this._userChangesUnsubscribe = onSnapshot(doc(this._db, this._collectionName, userId), (document) =>
            this._userSubject.next(document.data() as UserDocument)
        );
    }
}

