import { Component, Input, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DefinitionFlashcardService } from 'src/app/services/flashcard/definition-flashcard/definition-flashcard.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-definition-flashcard-form',
    templateUrl: './definition-flashcard-form.component.html',
    styleUrls: ['./definition-flashcard-form.component.scss']
})
export class DefinitionFlashcardFormComponent {
    @Input({ required: true }) formTitle!: string;
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;

    public get formGroup(): FormGroup {
        return this._flashcardService.formGroup;
    }

    public get termFormControl(): FormControl {
        return this._flashcardService.formGroup.get('frontside')?.get('term') as FormControl;
    }

    public get definitionFormControl(): FormControl {
        return this._flashcardService.formGroup.get('backside')?.get('definition') as FormControl;
    }

    public get flashcardTerm(): string {
        return this._languageService.languageResouce.definitionFlashcardTerm;
    }

    public get flashcardDefinition(): string {
        return this._languageService.languageResouce.definitionFlashcardDefinition;
    }

    constructor(private _flashcardService: DefinitionFlashcardService, private _languageService: LanguageService) {}
}

