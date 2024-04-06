import { Component } from '@angular/core';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';

@Component({
    selector: 'app-create-collection-group-form',
    templateUrl: './create-collection-group-form.component.html',
    styleUrls: ['./create-collection-group-form.component.scss']
})
export class CreateCollectionGroupFormComponent {
    constructor(private _collectionFormGorupService: CollectionGroupFormService) {}

    public async createCollectionGroup() {
        await this._collectionFormGorupService.createCollectionGroup();
    }
}

