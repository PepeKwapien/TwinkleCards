import { Component, Input } from '@angular/core';
import { DefinitionFlashcardService } from 'src/app/services/flashcard/definition-flashcard/definition-flashcard.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-create-definition-flashcard-form',
    templateUrl: './create-definition-flashcard-form.component.html',
    styleUrls: ['./create-definition-flashcard-form.component.scss'],
    providers: [DefinitionFlashcardService]
})
export class CreateDefinitionFlashcardFormComponent {
    @Input({ required: true }) collectionId!: string;

    public get createButtonText(): string {
        return this._languageService.languageResouce.createButton;
    }

    public get formTitle(): string {
        return this._languageService.languageResouce.createFlashcardFormTitle;
    }

    constructor(private _flashcardService: DefinitionFlashcardService, private _languageService: LanguageService) {}

    public createDefinitionFlashcard() {
        return () => this._flashcardService.createFlashcard(this.collectionId);
    }
}

