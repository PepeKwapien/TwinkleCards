import { Component, Input, OnInit } from '@angular/core';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';

@Component({
    selector: 'app-edit-collection-group-form',
    templateUrl: './edit-collection-group-form.component.html',
    styleUrls: ['./edit-collection-group-form.component.scss']
})
export class EditCollectionGroupFormComponent implements OnInit {
    @Input({ required: true }) collectionGroup!: IUserCollectionGroup;

    constructor(private _collectionFormGorupService: CollectionGroupFormService) {}

    ngOnInit(): void {
        this._collectionFormGorupService.formGroup.patchValue({
            name: this.collectionGroup.name,
            color: this.collectionGroup.color
        });
    }

    public editCollectionGroupCallback() {
        return async () => {
            await this._collectionFormGorupService.editCollectionGroup(this.collectionGroup);
        };
    }
}

