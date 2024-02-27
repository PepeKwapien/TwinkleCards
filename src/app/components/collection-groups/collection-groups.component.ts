import { Component, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDocument } from 'src/app/models/documents/user.document';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-collection-groups',
    templateUrl: './collection-groups.component.html',
    styleUrls: ['./collection-groups.component.scss']
})
export class CollectionGroupsComponent {
    public get firebaseUser$(): Observable<UserDocument> {
        return this._authService.user$;
    }

    constructor(private _authService: AuthService, private _modalService: ModalService) {}

    public openModal(collectionGroupForm: TemplateRef<any>) {
        this._modalService.open(collectionGroupForm);
    }
}

