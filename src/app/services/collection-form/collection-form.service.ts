import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../modal/modal.service';
import { UserIdInterceptorService } from '../user-id-interceptor/user-id-interceptor.service';
import { CollectionRepositoryService } from '../collection-repository/collection-repository.service';

export type CollectionType = 'definition' | 'translation';

export type CollectionInputs = {
    name: string;
    description: string | null;
    isPublic: boolean;
    type: CollectionType;
    group: string;
};

@Injectable({
    providedIn: 'root'
})
export class CollectionFormService {
    private _formGroup: FormGroup;

    public get formGroup(): FormGroup {
        return this._formGroup;
    }

    constructor(
        private _formBuilder: FormBuilder,
        private _modalService: ModalService,
        private _userIdInterceptor: UserIdInterceptorService,
        private _collectionRepository: CollectionRepositoryService
    ) {
        this._formGroup = this._formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            isPublic: [false],
            type: ['', Validators.required],
            group: ['', Validators.required]
        });
    }

    public async createCollection(): Promise<void> {
        const collectionInputs = this._formGroup.value as CollectionInputs;
        const collectionId = await this._userIdInterceptor.createCollection(collectionInputs);
        await this._userIdInterceptor.createCollectionReference(collectionInputs.group, collectionId, collectionInputs.name);
        this._modalService.close();
    }

    public async updateCollection(collectionId: string): Promise<void> {
        const collectionInputs = this._formGroup.value as CollectionInputs;
        await this._collectionRepository.updateCollection(collectionId, collectionInputs);
        await this._userIdInterceptor.updateCollectionReference(collectionInputs.group, collectionId, collectionInputs.name);
    }

    public setCollectionGroup(collectionGroupName: string): void {
        this._formGroup.patchValue({ group: collectionGroupName });
    }

    public patchFormGroupValue(collectionInputs: CollectionInputs) {
        this._formGroup.patchValue(collectionInputs);
    }

    public resetFormGroup(): void {
        this._formGroup.reset({
            isPublic: false,
            description: null
        });
    }
}

