import { Injectable } from '@angular/core';
import { DocumentData, Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { UserDocument } from 'src/app/models/documents/user.document';

@Injectable({
    providedIn: 'root'
})
export class UserRepositoryService {
    private _collectionName = 'users';
    private _db: Firestore;

    constructor(firestore: Firestore) {
        this._db = firestore;
    }

    async getUser(userId: string): Promise<UserDocument | undefined> {
        return (await getDoc(doc(this._db, this._collectionName, userId))).data() as UserDocument | undefined;
    }

    async upsertUser(userId: string, user: UserDocument) {
        return await setDoc(doc(this._db, this._collectionName, userId), { ...user });
    }

    async updateLastLogin(userId: string) {
        return await updateDoc(doc(this._db, this._collectionName, userId), { lastLogin: new Date() });
    }
}

