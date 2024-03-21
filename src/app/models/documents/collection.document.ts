import { CollectionInputs, CollectionType } from 'src/app/services/collection-form/collection-form.service';
import { IBaseFlashcard } from './flashcards/base-flashcard.interface';

export class CollectionDocument {
    name: string;
    ownerId: string;
    description?: string;
    isPublic: boolean;
    type: CollectionType;
    flashcards: IBaseFlashcard[];

    constructor(name: string, ownerId: string, isPublic: boolean, type: CollectionType, description: string | null) {
        this.name = name;
        this.ownerId = ownerId;
        this.isPublic = isPublic;
        this.type = type;
        this.flashcards = [];

        if (description) {
            this.description = description;
        }
    }

    public static FromCollectionInputs(ownerId: string, collectionInputs: CollectionInputs) {
        return new CollectionDocument(
            collectionInputs.name,
            ownerId,
            collectionInputs.isPublic,
            collectionInputs.type,
            collectionInputs.description
        );
    }
}
