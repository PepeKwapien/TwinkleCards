import { IBaseFlashcard } from '../models/documents/flashcards/base-flashcard.interface';
import { IDefinitionFlashcard } from '../models/documents/flashcards/definition-flashcard.interface';
import { ITranslationFlashcard } from '../models/documents/flashcards/translation-flashcard.interface';

export function getFrontsideFlashcardHeader(flashcard: IBaseFlashcard): string {
    if ((flashcard as IDefinitionFlashcard).term) {
        return (flashcard as IDefinitionFlashcard).term;
    } else {
        return (flashcard as ITranslationFlashcard).word;
    }
}

export function getFrontsideFlashcardBody(flashcard: IBaseFlashcard): string {
    if ((flashcard as ITranslationFlashcard).sentence) {
        return (flashcard as ITranslationFlashcard).sentence ?? '';
    } else {
        return '';
    }
}

export function getBacksideFlashcardHeader(flashcard: IBaseFlashcard): string {
    if ((flashcard as ITranslationFlashcard).translation) {
        return (flashcard as ITranslationFlashcard).translation;
    } else {
        return '';
    }
}

export function getBacksideFlashcardBody(flashcard: IBaseFlashcard): string {
    if ((flashcard as ITranslationFlashcard).translatedSentence) {
        return (flashcard as ITranslationFlashcard).translatedSentence ?? '';
    } else {
        return (flashcard as IDefinitionFlashcard).definition;
    }
}
