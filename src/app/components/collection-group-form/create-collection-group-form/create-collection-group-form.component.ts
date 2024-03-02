import { Component } from '@angular/core';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-create-collection-group-form',
    templateUrl: './create-collection-group-form.component.html',
    styleUrls: ['./create-collection-group-form.component.scss']
})
export class CreateCollectionGroupFormComponent {
    constructor(private _collectionFormGorupService: CollectionGroupFormService, private _modalService: ModalService) {}

    public async createCollectionGroup($event: Event) {
        $event.preventDefault();
        if (this._collectionFormGorupService.formGroup.valid) {
            await this._collectionFormGorupService.createCollectionGroup();
            this._modalService.close();
        }
    }
}

