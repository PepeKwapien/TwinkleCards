import { Component, Input, TemplateRef } from '@angular/core';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionFormService } from 'src/app/services/collection-form/collection-form.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserIdInterceptorService } from 'src/app/services/user-id-interceptor/user-id-interceptor.service';

@Component({
    selector: 'app-collection-group',
    templateUrl: './collection-group.component.html',
    styleUrls: ['./collection-group.component.scss']
})
export class CollectionGroupComponent {
    @Input({ required: true }) collectionGroup!: IUserCollectionGroup;

    constructor(
        private _modalService: ModalService,
        private _userIdInterceptorService: UserIdInterceptorService,
        private _collectionFormService: CollectionFormService
    ) {}

    public openModal(modalTemplate: TemplateRef<Element>) {
        this._modalService.open(modalTemplate);
    }

    public openCreateCollectionModal(collectionGroupForm: TemplateRef<Element>) {
        this._collectionFormService.setCollectionGroup(this.collectionGroup.name);
        this.openModal(collectionGroupForm);
    }

    public async deleteGroup() {
        if (this.collectionGroup === undefined) {
            return;
        }
        const result = await this._modalService.getConfirmation({
            title: `Delete '${this.collectionGroup.name}' group?`,
            description:
                'This action will remove the group and all of the collections inside it\nThis is irreversible. Are you sure?',
            color: this.collectionGroup.color
        });

        if (result) {
            this._userIdInterceptorService.deleteCollectionGroup(this.collectionGroup);
        }
    }
}

