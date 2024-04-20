import { IBaseFlashcard } from '../models/documents/flashcards/base-flashcard.interface';
import { IDefinitionFlashcard } from '../models/documents/flashcards/definition-flashcard.interface';
import { CollectionType } from '../types/collection-type.type';

export function determineCollectionTypeBasedOnFlashcard(flashcard: IBaseFlashcard): CollectionType {
    if ((flashcard as IDefinitionFlashcard).term) {
        return 'definition';
    } else {
        return 'translation';
    }
}
