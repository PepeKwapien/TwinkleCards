import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { CollectionInputs } from '../collection-form/collection-form.service';
import { CollectionDocument } from 'src/app/models/documents/collection.document';

@Injectable({
    providedIn: 'root'
})
export class CollectionRepositoryService {
    private _collectionName = 'collections';

    constructor(private _firestore: Firestore) {}

    public async createCollection(ownerId: string, collectionInputs: CollectionInputs): Promise<string> {
        console.log(collectionInputs);
        const collectionDocument = CollectionDocument.FromCollectionInputs(ownerId, collectionInputs);
        const docRef = await addDoc(collection(this._firestore, this._collectionName), { ...collectionDocument });

        return docRef.id;
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

