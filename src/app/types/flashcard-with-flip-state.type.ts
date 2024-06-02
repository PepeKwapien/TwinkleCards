import { IBaseFlashcard } from '../models/documents/flashcards/base-flashcard.interface';

export type IFlashcardWithFlipState = {
    flashcard: IBaseFlashcard;
    flipped: boolean;
};
