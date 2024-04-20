import { IBaseFlashcard } from './documents/flashcards/base-flashcard.interface';

export interface IFlashcardWithFlipState {
    flashcard: IBaseFlashcard;
    flipped: boolean;
}
