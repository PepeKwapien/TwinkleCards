import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { CollectionInputs } from '../collection-form/collection-form.service';
import { CollectionDocument } from 'src/app/models/documents/collection.document';

@Injectable({
    providedIn: 'root'
})
export class CollectionRepositoryService {
    private _collectionName = 'collections';

    constructor(private _firestore: Firestore) {}

    public async createCollection(ownerId: string, collectionInputs: CollectionInputs): Promise<string> {
        const collectionDocument = CollectionDocument.FromCollectionInputs(ownerId, collectionInputs);

        const docRef = await addDoc(collection(this._firestore, this._collectionName), { ...collectionDocument });

        return docRef.id;
    }
}

