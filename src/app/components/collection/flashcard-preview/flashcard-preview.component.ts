import { Component, Input } from '@angular/core';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IDefinitionFlashcard } from 'src/app/models/documents/flashcards/definition-flashcard.interface';
import { ITranslationFlashcard } from 'src/app/models/documents/flashcards/translation-flashcard.interface';

@Component({
    selector: 'app-flashcard-preview',
    templateUrl: './flashcard-preview.component.html',
    styleUrls: ['./flashcard-preview.component.scss']
})
export class FlashcardPreviewComponent {
    @Input({ required: true }) flashcard!: IBaseFlashcard;

    public getFrontsideFlashcardHeader(): string {
        if ((this.flashcard as IDefinitionFlashcard).term) {
            return (this.flashcard as IDefinitionFlashcard).term;
        } else {
            return (this.flashcard as ITranslationFlashcard).word;
        }
    }

    public getFronsideFlashcardBody(): string {
        if ((this.flashcard as ITranslationFlashcard).sentence) {
            return (this.flashcard as ITranslationFlashcard).sentence ?? '';
        } else {
            return '';
        }
    }
}

