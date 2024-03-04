import { Component } from '@angular/core';
import { CollectionFormService } from 'src/app/services/collection-form/collection-form.service';

@Component({
    selector: 'app-create-collection-form',
    templateUrl: './create-collection-form.component.html',
    styleUrls: ['./create-collection-form.component.scss']
})
export class CreateCollectionFormComponent {
    constructor(private _collectionFormService: CollectionFormService) {}

    public async createCollection() {
        if (this._collectionFormService.formGroup.valid) {
            await this._collectionFormService.createCollection();
        }
    }
}

