import { Component, Input } from '@angular/core';
import { TranslationFlashcardService } from 'src/app/services/flashcard/translation-flashcard/translation-flashcard.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-create-translation-flashcard-form',
    templateUrl: './create-translation-flashcard-form.component.html',
    styleUrls: ['./create-translation-flashcard-form.component.scss'],
    providers: [TranslationFlashcardService]
})
export class CreateTranslationFlashcardFormComponent {
    @Input({ required: true }) collectionId!: string;

    public get createButtonText(): string {
        return this._languageService.languageResouce.createButton;
    }

    public get formTitle(): string {
        return this._languageService.languageResouce.createFlashcardFormTitle;
    }

    constructor(private _flashcardService: TranslationFlashcardService, private _languageService: LanguageService) {}

    public createDefinitionFlashcard() {
        return () => this._flashcardService.createFlashcard(this.collectionId);
    }
}

