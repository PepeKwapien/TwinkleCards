import { Component, Input, TemplateRef } from '@angular/core';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserIdInterceptorService } from 'src/app/services/user-id-interceptor/user-id-interceptor.service';

@Component({
    selector: 'app-collection-group',
    templateUrl: './collection-group.component.html',
    styleUrls: ['./collection-group.component.scss']
})
export class CollectionGroupComponent {
    @Input() collectionGroup: IUserCollectionGroup | undefined;

    constructor(private _modalService: ModalService, private _userIdInterceptorService: UserIdInterceptorService) {}

    public openModal(collectionGroupForm: TemplateRef<any>) {
        this._modalService.open(collectionGroupForm);
    }

    public async deleteGroup() {
        if (this.collectionGroup === undefined) {
            return;
        }
        const result = await this._modalService.getConfirmation({
            title: `Delete '${this.collectionGroup.name}' group?`,
            description:
                'This action will remove the group and all of the collections inside it\nThis is irreversible. Are you sure?'
        });

        if (result) {
            this._userIdInterceptorService.deleteCollectionGroup(this.collectionGroup);
        }
    }
}

