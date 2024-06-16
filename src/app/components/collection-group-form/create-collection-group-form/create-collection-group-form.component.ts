import { Component } from '@angular/core';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-create-collection-group-form',
    templateUrl: './create-collection-group-form.component.html',
    styleUrls: ['./create-collection-group-form.component.scss']
})
export class CreateCollectionGroupFormComponent {
    public get createButtonText(): string {
        return this._languageService.languageResouce.createButton;
    }

    public get formTitle(): string {
        return this._languageService.languageResouce.createCollectionGroupTitle;
    }

    constructor(private _collectionFormGorupService: CollectionGroupFormService, private _languageService: LanguageService) {}

    public async createCollectionGroup() {
        await this._collectionFormGorupService.createCollectionGroup();
    }
}

