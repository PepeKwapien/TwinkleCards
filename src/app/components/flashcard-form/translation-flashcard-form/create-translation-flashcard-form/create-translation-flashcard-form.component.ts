import { Component } from '@angular/core';
import { TranslationFlashcardService } from 'src/app/services/flashcard/translation-flashcard/translation-flashcard.service';

@Component({
    selector: 'app-create-translation-flashcard-form',
    templateUrl: './create-translation-flashcard-form.component.html',
    styleUrls: ['./create-translation-flashcard-form.component.scss'],
    providers: [TranslationFlashcardService]
})
export class CreateTranslationFlashcardFormComponent {
    constructor(private _flashcardService: TranslationFlashcardService) {}

    public createDefinitionFlashcard() {
        return () => this._flashcardService.createFlashcard();
    }
}

