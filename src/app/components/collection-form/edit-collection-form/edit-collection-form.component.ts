import { Component, Input, OnInit } from '@angular/core';
import { ICollectionReference } from 'src/app/models/documents/collection-reference.document';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionFormService } from 'src/app/services/collection-form/collection-form.service';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-edit-collection-form',
    templateUrl: './edit-collection-form.component.html',
    styleUrls: ['./edit-collection-form.component.scss']
})
export class EditCollectionFormComponent implements OnInit {
    @Input({ required: true }) collectionReference!: ICollectionReference;
    @Input({ required: true }) collectionGroup!: IUserCollectionGroup;

    constructor(
        private _collectionFormService: CollectionFormService,
        private _collectionRepository: CollectionRepositoryService,
        private _modalService: ModalService
    ) {}

    async ngOnInit() {
        const collectionDocument = await this._collectionRepository.readCollection(this.collectionReference.id);

        if (!collectionDocument) {
            this._modalService.close();
            return;
        }

        this._collectionFormService.patchFormGroupValue({
            name: this.collectionReference.name,
            description: collectionDocument.description ?? null,
            isPublic: collectionDocument.isPublic,
            type: collectionDocument.type,
            group: this.collectionGroup.name
        });
    }

    public editCollectionCallback() {
        return async () => {
            await this._collectionFormService.updateCollection(this.collectionReference.id);
            this._modalService.close();
        };
    }
}

