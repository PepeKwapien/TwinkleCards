import { CollectionType } from 'src/app/types/collection-type.type';
import { IBaseFlashcard } from './flashcards/base-flashcard.interface';
import { CollectionInputs } from 'src/app/types/collection-inputs.type';

export class CollectionDocument {
    name: string;
    ownerId: string;
    description?: string;
    isPublic: boolean;
    type: CollectionType;
    flashcards: IBaseFlashcard[];
    markedFlashcards: string[];

    constructor(name: string, ownerId: string, isPublic: boolean, type: CollectionType, description: string | null) {
        this.name = name;
        this.ownerId = ownerId;
        this.isPublic = isPublic;
        this.type = type;
        this.flashcards = [];
        this.markedFlashcards = [];

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
