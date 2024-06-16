import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CollectionFormService } from '../../../services/collection-form/collection-form.service';
import { UserRepositoryService } from 'src/app/services/user-repository/user-repository.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-collection-form-body',
    templateUrl: './collection-form-body.component.html',
    styleUrls: ['./collection-form-body.component.scss']
})
export class CollectionFormBodyComponent implements OnDestroy {
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;
    @Input() editForm: boolean = false;

    public get formGroup(): FormGroup {
        return this._collectionFormService.formGroup;
    }

    public get collectionGroups(): string[] {
        return this._userRepository.userCollectionGroupNames;
    }

    public get nameText() {
        return this._languageService.languageResouce.name;
    }

    public get descriptionText() {
        return this._languageService.languageResouce.description;
    }

    public get collectionTypeText() {
        return this._languageService.languageResouce.collectionType;
    }

    public get termText() {
        return this._languageService.languageResouce.definitionFlashcardTerm;
    }

    public get definitionText() {
        return this._languageService.languageResouce.definitionFlashcardDefinition;
    }

    public get wordText() {
        return this._languageService.languageResouce.translationFlashcardWord;
    }

    public get translationText() {
        return this._languageService.languageResouce.translationFlashcardTranslation;
    }

    public get exampleUseText() {
        return this._languageService.languageResouce.exampleUse;
    }

    public get translatedUseText() {
        return this._languageService.languageResouce.translatedUse;
    }

    public get groupText() {
        return this._languageService.languageResouce.group;
    }

    public get optionalText() {
        return this._languageService.languageResouce.optional;
    }

    constructor(
        private _collectionFormService: CollectionFormService,
        private _userRepository: UserRepositoryService,
        private _languageService: LanguageService
    ) {}

    ngOnDestroy(): void {
        this._collectionFormService.resetFormGroup();
    }

    public async callback($event: Event) {
        $event.preventDefault();
        await this.buttonCallback();
    }
}
