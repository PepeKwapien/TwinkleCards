import { Component, Input, OnInit } from '@angular/core';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-edit-collection-group-form',
    templateUrl: './edit-collection-group-form.component.html',
    styleUrls: ['./edit-collection-group-form.component.scss']
})
export class EditCollectionGroupFormComponent implements OnInit {
    @Input({ required: true }) collectionGroup!: IUserCollectionGroup;

    constructor(private _collectionFormGorupService: CollectionGroupFormService, private _modalService: ModalService) {}

    ngOnInit(): void {
        this._collectionFormGorupService.formGroup.patchValue({
            name: this.collectionGroup.name,
            color: this.collectionGroup.color
        });
    }

    public async editCollectionGroup($event: Event) {
        $event.preventDefault();
        if (this._collectionFormGorupService.formGroup.valid) {
            await this._collectionFormGorupService.editCollectionGroup(this.collectionGroup);
            this._modalService.close();
        }
    }
}

