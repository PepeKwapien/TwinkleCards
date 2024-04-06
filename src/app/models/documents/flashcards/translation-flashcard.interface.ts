import { IBaseFlashcard } from './base-flashcard.interface';

export interface ITranslationFlashcard extends IBaseFlashcard {
    word: string;
    sentence?: string;
    translation: string;
    translatedSentence?: string;
}
