import { Injectable } from '@angular/core';
import { Firestore, arrayUnion, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { UserDocument } from 'src/app/models/documents/user.document';

@Injectable({
    providedIn: 'root'
})
export class UserRepositoryService {
    private _collectionName = 'users';
    private _db: Firestore;
    private _userId: string | undefined;

    public set userId(value: string) {
        this._userId = value;
    }

    constructor(private _firestore: Firestore) {
        this._db = this._firestore;
    }

    async getUser(): Promise<UserDocument | undefined> {
        const userDocument = (await getDoc(doc(this._db, this._collectionName, this._userId!))).data() as
            | UserDocument
            | undefined;

        return userDocument;
    }

    async upsertUser(user: UserDocument) {
        return await setDoc(doc(this._db, this._collectionName, this._userId!), { ...user });
    }

    async updateLastLogin(): Promise<void> {
        await updateDoc(doc(this._db, this._collectionName, this._userId!), { lastLogin: new Date() });
    }

    async createCollectionGroup(collectionGroupName: string): Promise<void> {
        await updateDoc(doc(this._db, this._collectionName, this._userId!), {
            collectionGroups: arrayUnion({ name: collectionGroupName, colletions: [] as string[] })
        });
    }
}

