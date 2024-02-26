import { Component, Input, TemplateRef } from '@angular/core';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-collection-group',
    templateUrl: './collection-group.component.html',
    styleUrls: ['./collection-group.component.scss']
})
export class CollectionGroupComponent {
    @Input() collectionGroup: IUserCollectionGroup | undefined;

    constructor(private _modalService: ModalService) {}

    public openModal(collectionGroupForm: TemplateRef<any>) {
        this._modalService.open(collectionGroupForm);
    }
}

