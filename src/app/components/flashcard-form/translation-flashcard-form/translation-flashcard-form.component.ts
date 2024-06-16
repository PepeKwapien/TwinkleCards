import { Component, Input, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslationFlashcardService } from 'src/app/services/flashcard/translation-flashcard/translation-flashcard.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-translation-flashcard-form',
    templateUrl: './translation-flashcard-form.component.html',
    styleUrls: ['./translation-flashcard-form.component.scss']
})
export class TranslationFlashcardFormComponent {
    @Input({ required: true }) formTitle!: string;
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;

    public get formGroup(): FormGroup {
        return this._flashcardService.formGroup;
    }

    public get wordFormControl(): FormControl {
        return this._flashcardService.formGroup.get('frontside')?.get('word') as FormControl;
    }

    public get sentenceFormControl(): FormControl {
        return this._flashcardService.formGroup.get('frontside')?.get('sentence') as FormControl;
    }

    public get translationFormControl(): FormControl {
        return this._flashcardService.formGroup.get('backside')?.get('translation') as FormControl;
    }

    public get translatedSentenceFormControl(): FormControl {
        return this._flashcardService.formGroup.get('backside')?.get('translatedSentence') as FormControl;
    }

    public get flashcardWord(): string {
        return this._languageService.languageResouce.translationFlashcardWord;
    }

    public get flashcardSentence(): string {
        return this._languageService.languageResouce.translationFlashcardSentence;
    }

    public get flashcardTranslation(): string {
        return this._languageService.languageResouce.translationFlashcardTranslation;
    }

    public get flashcardTranslatedSentence(): string {
        return this._languageService.languageResouce.translationFlashcardTranslatedSentence;
    }

    public get optionalText() {
        return this._languageService.languageResouce.optional;
    }

    constructor(private _flashcardService: TranslationFlashcardService, private _languageService: LanguageService) {}
}

