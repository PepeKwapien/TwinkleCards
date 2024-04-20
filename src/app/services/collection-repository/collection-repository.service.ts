import { Injectable, OnDestroy } from '@angular/core';
import {
    Firestore,
    Unsubscribe,
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    updateDoc
} from '@angular/fire/firestore';
import { CollectionDocument } from 'src/app/models/documents/collection.document';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IDefinitionFlashcard } from 'src/app/models/documents/flashcards/definition-flashcard.interface';
import { ITranslationFlashcard } from 'src/app/models/documents/flashcards/translation-flashcard.interface';
import { CollectionInputs } from 'src/app/types/collection-inputs.type';

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
        this.stopCollectionChangesListener();
    }

    public async createCollection(ownerId: string, collectionInputs: CollectionInputs): Promise<string> {
        console.log(collectionInputs);
        const collectionDocument = CollectionDocument.FromCollectionInputs(ownerId, collectionInputs);
        const docRef = await addDoc(collection(this._firestore, this._collectionName), { ...collectionDocument });

        return docRef.id;
    }

    public setupCollectionChangesListener(collectionId: string): void {
        this._collectionChangesUnsubscribe = onSnapshot(doc(this._firestore, this._collectionName, collectionId), (document) =>
            this._collectionSubject.next(document.data() as CollectionDocument)
        );
    }

    public stopCollectionChangesListener(): void {
        if (this._collectionChangesUnsubscribe !== undefined) {
            this._collectionSubject.next(undefined);
            this._collectionChangesUnsubscribe();
        }
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

    public async createFlashcard(collectionId: string, flashcard: IBaseFlashcard): Promise<void> {
        await updateDoc(doc(this._firestore, this._collectionName, collectionId), { flashcards: arrayUnion(flashcard) });
    }

    public async updateFlashcard(collectionId: string, flashcard: IBaseFlashcard): Promise<void> {
        const currentCollection = this._collectionSubject.value as CollectionDocument;
        const currentCollectionFlashcards = currentCollection.flashcards;
        const currentCollectionType = currentCollection.type;

        const matchingFlashcard = currentCollectionFlashcards.find((browsedFlashcard) => browsedFlashcard.id === flashcard.id);

        if (!matchingFlashcard) {
            return;
        }

        if (currentCollectionType === 'definition') {
            const definitionFlashcard = flashcard as IDefinitionFlashcard;

            (matchingFlashcard as IDefinitionFlashcard).term = definitionFlashcard.term;
            (matchingFlashcard as IDefinitionFlashcard).definition = definitionFlashcard.definition;
        } else {
            const translationFlashcard = flashcard as ITranslationFlashcard;

            (matchingFlashcard as ITranslationFlashcard).word = translationFlashcard.word;
            (matchingFlashcard as ITranslationFlashcard).sentence = translationFlashcard.sentence;
            (matchingFlashcard as ITranslationFlashcard).translation = translationFlashcard.translation;
            (matchingFlashcard as ITranslationFlashcard).translatedSentence = translationFlashcard.translatedSentence;
        }

        await updateDoc(doc(this._firestore, this._collectionName, collectionId), {
            flashcards: currentCollectionFlashcards
        });
    }

    public async deleteFlashcard(collectionId: string, flashcard: IBaseFlashcard): Promise<void> {
        await updateDoc(doc(this._firestore, this._collectionName, collectionId), { flashcards: arrayRemove(flashcard) });
    }
}
