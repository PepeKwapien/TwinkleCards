import { Injectable, OnDestroy } from '@angular/core';
import {
    Firestore,
    Unsubscribe,
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
    updateDoc
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionGroupColorType } from 'src/app/helpers/colors.helper';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { UserDocument } from 'src/app/models/documents/user.document';

export type CollectionGroupProperties = { name: string; color: CollectionGroupColorType };

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

    public get userCollectionGroupNames(): string[] {
        return this._userSubject.value
            ? this._userSubject.value.collectionGroups.map((collectionGroup) => collectionGroup.name)
            : [];
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

    async setupUserChanges(userId: string): Promise<void> {
        this._userChangesUnsubscribe = onSnapshot(doc(this._db, this._collectionName, userId), (document) =>
            this._userSubject.next(document.data() as UserDocument)
        );
    }

    async clearUser(): Promise<void> {
        this._userSubject.next(undefined);
    }

    async createCollectionGroup(userId: string, collectionGroupProperties: CollectionGroupProperties): Promise<void> {
        await updateDoc(doc(this._db, this._collectionName, userId), {
            collectionGroups: arrayUnion({
                name: collectionGroupProperties.name,
                color: collectionGroupProperties.color,
                colletions: [] as string[]
            })
        });
    }

    async editCollectionGroup(
        userId: string,
        collectionGroup: IUserCollectionGroup,
        collectionGroupProperties: CollectionGroupProperties
    ): Promise<void> {
        const userCollectionGroups = (this._userSubject.value as UserDocument).collectionGroups;
        const matchingCollectionGroup = userCollectionGroups.find(
            (group) => JSON.stringify(group) === JSON.stringify(collectionGroup)
        );

        if (!matchingCollectionGroup) {
            return;
        }

        matchingCollectionGroup.name = collectionGroupProperties.name;
        matchingCollectionGroup.color = collectionGroupProperties.color;

        await updateDoc(doc(this._db, this._collectionName, userId), {
            collectionGroups: userCollectionGroups
        });
    }

    async deleteCollectionGroup(userId: string, collectionGroup: IUserCollectionGroup): Promise<void> {
        await updateDoc(doc(this._db, this._collectionName, userId), {
            collectionGroups: arrayRemove({ ...collectionGroup })
        });
    }
}

