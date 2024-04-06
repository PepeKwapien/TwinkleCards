import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserIdInterceptorService } from '../user-id-interceptor/user-id-interceptor.service';
import { ModalService } from '../modal/modal.service';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionGroupProperties } from '../user-repository/user-repository.service';

@Injectable({
    providedIn: 'root'
})
export class CollectionGroupFormService {
    private _formGroup: FormGroup;

    public get formGroup(): FormGroup {
        return this._formGroup;
    }

    constructor(
        private _userIdInterceptorService: UserIdInterceptorService,
        private _formBuilder: FormBuilder,
        private _modalService: ModalService
    ) {
        this._formGroup = this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1)]],
            color: ['', Validators.required]
        });
    }

    public async createCollectionGroup() {
        if (!this._formGroup.valid) {
            return;
        }

        await this._userIdInterceptorService.createCollectionGroup(this._formGroup.value as CollectionGroupProperties);
        this._modalService.close();
    }

    public async editCollectionGroup(collectionGroup: IUserCollectionGroup) {
        if (!this._formGroup.valid) {
            return;
        }

        await this._userIdInterceptorService.editCollectionGroup(
            collectionGroup,
            this._formGroup.value as CollectionGroupProperties
        );
        this._modalService.close();
    }

    public resetFormGroup(): void {
        this._formGroup.reset();
    }
}

