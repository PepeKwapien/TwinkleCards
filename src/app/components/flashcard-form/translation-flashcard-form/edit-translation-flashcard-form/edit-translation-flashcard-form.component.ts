import { Component, Input } from '@angular/core';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { ITranslationFlashcard } from 'src/app/models/documents/flashcards/translation-flashcard.interface';
import { TranslationFlashcardService } from 'src/app/services/flashcard/translation-flashcard/translation-flashcard.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-edit-translation-flashcard-form',
    templateUrl: './edit-translation-flashcard-form.component.html',
    styleUrls: ['./edit-translation-flashcard-form.component.scss'],
    providers: [TranslationFlashcardService]
})
export class EditTranslationFlashcardFormComponent {
    @Input({ required: true }) collectionId!: string;
    @Input({ required: true }) flashcard!: IBaseFlashcard;

    public get saveButtonText(): string {
        return this._languageService.languageResouce.saveButton;
    }

    public get formTitle(): string {
        return this._languageService.languageResouce.editFlashcardFormTitle;
    }

    constructor(private _flashcardService: TranslationFlashcardService, private _languageService: LanguageService) {}

    ngOnInit(): void {
        this._flashcardService.formGroup.patchValue({
            frontside: {
                word: (this.flashcard as ITranslationFlashcard).word,
                sentence: (this.flashcard as ITranslationFlashcard).sentence
            },
            backside: {
                translation: (this.flashcard as ITranslationFlashcard).translation,
                translatedSentence: (this.flashcard as ITranslationFlashcard).translatedSentence
            }
        });
    }

    public editDefinitionFlashcard() {
        return () => this._flashcardService.updateFlashcard(this.collectionId, this.flashcard);
    }
}

