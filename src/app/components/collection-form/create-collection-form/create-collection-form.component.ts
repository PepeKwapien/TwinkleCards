import { Component } from '@angular/core';
import { CollectionFormService } from 'src/app/services/collection-form/collection-form.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-create-collection-form',
    templateUrl: './create-collection-form.component.html',
    styleUrls: ['./create-collection-form.component.scss']
})
export class CreateCollectionFormComponent {
    public get createButtonText() {
        return this._languageService.languageResouce.createButton;
    }

    public get formTitle() {
        return this._languageService.languageResouce.createCollectionTitle;
    }

    constructor(private _collectionFormService: CollectionFormService, private _languageService: LanguageService) {}

    public async createCollection() {
        await this._collectionFormService.createCollection();
    }
}

