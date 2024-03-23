import { Injectable, OnDestroy } from '@angular/core';
import {
    Firestore,
    Unsubscribe,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    updateDoc
} from '@angular/fire/firestore';
import { CollectionInputs } from '../collection-form/collection-form.service';
import { CollectionDocument } from 'src/app/models/documents/collection.document';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CollectionRepositoryService implements OnDestroy {
    private _collectionName = 'collections';
    private _collectionChangesUnsubscribe: Unsubscribe | undefined;
    private _collectionSubject: BehaviorSubject<CollectionDocument | undefined>;

    public get collection$(): Observable<CollectionDocument | undefined> {
        return this._collectionSubject;
    }

    constructor(private _firestore: Firestore) {
        this._collectionSubject = new BehaviorSubject<CollectionDocument | undefined>(undefined);
    }

    ngOnDestroy(): void {
        if (this._collectionChangesUnsubscribe !== undefined) {
            this._collectionChangesUnsubscribe();
        }
    }

    public async createCollection(ownerId: string, collectionInputs: CollectionInputs): Promise<string> {
        console.log(collectionInputs);
        const collectionDocument = CollectionDocument.FromCollectionInputs(ownerId, collectionInputs);
        const docRef = await addDoc(collection(this._firestore, this._collectionName), { ...collectionDocument });

        return docRef.id;
    }

    public setupCollectionChanges(collectionId: string): void {
        this._collectionChangesUnsubscribe = onSnapshot(doc(this._firestore, this._collectionName, collectionId), (document) =>
            this._collectionSubject.next(document.data() as CollectionDocument)
        );
    }

    public async readCollection(collectionId: string): Promise<CollectionDocument | undefined> {
        return (await getDoc(doc(this._firestore, this._collectionName, collectionId))).data() as CollectionDocument | undefined;
    }

    public async updateCollection(collectionId: string, collectionInputs: CollectionInputs): Promise<void> {
        await updateDoc(doc(this._firestore, this._collectionName, collectionId), {
            name: collectionInputs.name,
            description: collectionInputs.description,
            isPublic: collectionInputs.isPublic
        });
    }

    public async deleteCollection(collectionId: string): Promise<void> {
        await deleteDoc(doc(this._firestore, this._collectionName, collectionId));
    }
}

