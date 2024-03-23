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
import { ICollectionReference } from 'src/app/models/documents/collection-reference.document';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { UserDocument } from 'src/app/models/documents/user.document';

export type CollectionGroupProperties = { name: string; color: CollectionGroupColorType };

@Injectable({
    providedIn: 'root'
})
export class UserRepositoryService implements OnDestroy {
    private _collectionName = 'users';
    private _userSubject: BehaviorSubject<UserDocument | undefined>;
    private _userChangesUnsubscribe: Unsubscribe | undefined;

    public get user$(): Observable<UserDocument | undefined> {
        return this._userSubject;
    }

    public get userCollectionGroupNames(): string[] {
        return this._userSubject.value
            ? this._userSubject.value.collectionGroups.map((collectionGroup) => collectionGroup.name)
            : [];
    }

    constructor(private _firestore: Firestore) {
        this._userSubject = new BehaviorSubject<UserDocument | undefined>(undefined);
    }

    ngOnDestroy(): void {
        if (this._userChangesUnsubscribe !== undefined) {
            this._userChangesUnsubscribe();
        }
    }

    public async readUser(userId: string): Promise<UserDocument | undefined> {
        return (await getDoc(doc(this._firestore, this._collectionName, userId))).data() as UserDocument | undefined;
    }

    public async upsertUser(userId: string, user: UserDocument) {
        return await setDoc(doc(this._firestore, this._collectionName, userId), { ...user });
    }

    public async updateLastLogin(userId: string): Promise<void> {
        await updateDoc(doc(this._firestore, this._collectionName, userId), { lastLogin: new Date() });
    }

    public setupUserChanges(userId: string): void {
        this._userChangesUnsubscribe = onSnapshot(doc(this._firestore, this._collectionName, userId), (document) =>
            this._userSubject.next(document.data() as UserDocument)
        );
    }

    public async clearUser(): Promise<void> {
        this._userSubject.next(undefined);
    }

    public async createCollectionGroup(userId: string, collectionGroupProperties: CollectionGroupProperties): Promise<void> {
        const newCollectionGroup: IUserCollectionGroup = {
            name: collectionGroupProperties.name,
            color: collectionGroupProperties.color,
            collections: [] as ICollectionReference[]
        };

        await updateDoc(doc(this._firestore, this._collectionName, userId), {
            collectionGroups: arrayUnion(newCollectionGroup)
        });
    }

    public async editCollectionGroup(
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

        await updateDoc(doc(this._firestore, this._collectionName, userId), {
            collectionGroups: userCollectionGroups
        });
    }

    public async deleteCollectionGroup(userId: string, collectionGroup: IUserCollectionGroup): Promise<void> {
        await updateDoc(doc(this._firestore, this._collectionName, userId), {
            collectionGroups: arrayRemove({ ...collectionGroup })
        });
    }

    public async createCollectionReference(
        userId: string,
        collectionGroupName: string,
        collectionId: string,
        collectionName: string
    ) {
        const userCollectionGroups = (this._userSubject.value as UserDocument).collectionGroups;
        const matchingCollectionGroup = userCollectionGroups.find((group) => group.name == collectionGroupName);

        if (!matchingCollectionGroup) {
            return;
        }

        matchingCollectionGroup.collections.push({ name: collectionName, id: collectionId });

        await updateDoc(doc(this._firestore, this._collectionName, userId), {
            collectionGroups: userCollectionGroups
        });
    }

    public async updateCollectionReference(
        userId: string,
        newCollectionGroupName: string,
        collectionId: string,
        newCollectionName: string
    ) {
        let changesWereMade = false;

        const userCollectionGroups = (this._userSubject.value as UserDocument).collectionGroups;
        let currentCollectionGroup: IUserCollectionGroup | undefined,
            newCollectionGroup: IUserCollectionGroup | undefined = undefined;
        let currentCollectionReference: ICollectionReference;
        let indexOfCollectionReference: number;

        for (const collectionGroup of userCollectionGroups) {
            indexOfCollectionReference = collectionGroup.collections.findIndex(
                (collectionReference) => collectionReference.id === collectionId
            );

            if (indexOfCollectionReference !== -1) {
                currentCollectionGroup = collectionGroup;
                currentCollectionReference = collectionGroup.collections[indexOfCollectionReference];
            }

            if (collectionGroup.name === newCollectionGroupName) {
                newCollectionGroup = collectionGroup;
            }

            if (currentCollectionGroup && newCollectionGroup) {
                break;
            }
        }

        if (!currentCollectionGroup || !newCollectionGroup) {
            return;
        }

        if (currentCollectionGroup !== newCollectionGroup) {
            currentCollectionGroup.collections.splice(indexOfCollectionReference!, 1);
            const newCollectionReference: ICollectionReference = { id: collectionId, name: newCollectionName };
            newCollectionGroup.collections.push({ ...newCollectionReference });

            indexOfCollectionReference = newCollectionGroup.collections.length - 1;
            currentCollectionReference = newCollectionReference;
            currentCollectionGroup = newCollectionGroup;
            changesWereMade = true;
        }

        if (currentCollectionReference!.name !== newCollectionName) {
            currentCollectionGroup.collections[indexOfCollectionReference!].name = newCollectionName;
            changesWereMade = true;
        }

        if (!changesWereMade) {
            return;
        }

        await updateDoc(doc(this._firestore, this._collectionName, userId), { collectionGroups: userCollectionGroups });
    }

    public async deleteCollectionReference(
        userId: string,
        collectionGroupName: string,
        collectionReference: ICollectionReference
    ) {
        const userCollectionGroups = (this._userSubject.value as UserDocument).collectionGroups;
        const matchingCollectionGroup = userCollectionGroups.find((group) => group.name == collectionGroupName);

        if (!matchingCollectionGroup) {
            return;
        }

        const index = matchingCollectionGroup.collections.indexOf(collectionReference);
        if (index > -1) {
            matchingCollectionGroup.collections.splice(index, 1);

            await updateDoc(doc(this._firestore, this._collectionName, userId), {
                collectionGroups: userCollectionGroups
            });
        }
    }
}

