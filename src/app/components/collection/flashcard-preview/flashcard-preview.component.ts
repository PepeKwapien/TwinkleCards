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

    public get flipped(): boolean {
        return this._flipped;
    }

    private _flipped: boolean = false;

    public getFrontsideFlashcardHeader(): string {
        if ((this.flashcard as IDefinitionFlashcard).term) {
            return (this.flashcard as IDefinitionFlashcard).term;
        } else {
            return (this.flashcard as ITranslationFlashcard).word;
        }
    }

    public getFrontsideFlashcardBody(): string {
        if ((this.flashcard as ITranslationFlashcard).sentence) {
            return (this.flashcard as ITranslationFlashcard).sentence ?? '';
        } else {
            return '';
        }
    }

    public getBacksideFlashcardHeader(): string {
        if ((this.flashcard as ITranslationFlashcard).translation) {
            return (this.flashcard as ITranslationFlashcard).translation;
        } else {
            return '';
        }
    }

    public getBacksideFlashcardBody(): string {
        if ((this.flashcard as ITranslationFlashcard).translatedSentence) {
            return (this.flashcard as ITranslationFlashcard).translatedSentence ?? '';
        } else {
            return (this.flashcard as IDefinitionFlashcard).definition;
        }
    }

    public flip($event: Event): void {
        $event.preventDefault();
        this._flipped = !this._flipped;
    }
}

