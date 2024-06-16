import { Component, Input, OnInit } from '@angular/core';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IDefinitionFlashcard } from 'src/app/models/documents/flashcards/definition-flashcard.interface';
import { DefinitionFlashcardService } from 'src/app/services/flashcard/definition-flashcard/definition-flashcard.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-edit-definition-flashcard-form',
    templateUrl: './edit-definition-flashcard-form.component.html',
    styleUrls: ['./edit-definition-flashcard-form.component.scss'],
    providers: [DefinitionFlashcardService]
})
export class EditDefinitionFlashcardFormComponent implements OnInit {
    @Input({ required: true }) collectionId!: string;
    @Input({ required: true }) flashcard!: IBaseFlashcard;

    public get saveButtonText(): string {
        return this._languageService.languageResouce.saveButton;
    }

    public get formTitle(): string {
        return this._languageService.languageResouce.editFlashcardFormTitle;
    }

    constructor(private _flashcardService: DefinitionFlashcardService, private _languageService: LanguageService) {}

    ngOnInit(): void {
        this._flashcardService.formGroup.patchValue({
            frontside: { term: (this.flashcard as IDefinitionFlashcard).term },
            backside: { definition: (this.flashcard as IDefinitionFlashcard).definition }
        });
    }

    public editDefinitionFlashcard() {
        return () => this._flashcardService.updateFlashcard(this.collectionId, this.flashcard);
    }
}

