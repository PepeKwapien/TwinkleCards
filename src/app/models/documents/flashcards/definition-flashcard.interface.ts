import { IBaseFlashcard } from './base-flashcard.interface';

export interface IDefinitionFlashcard extends IBaseFlashcard {
    term: string;
    definition: string;
}
