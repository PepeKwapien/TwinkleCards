import { Component, Input, TemplateRef } from '@angular/core';
import { ICollectionReference } from 'src/app/models/documents/collection-reference.document';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionFormService } from 'src/app/services/collection-form/collection-form.service';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserIdInterceptorService } from 'src/app/services/user-id-interceptor/user-id-interceptor.service';

@Component({
    selector: 'app-collection-group',
    templateUrl: './collection-group.component.html',
    styleUrls: ['./collection-group.component.scss']
})
export class CollectionGroupComponent {
    @Input({ required: true }) collectionGroup!: IUserCollectionGroup;
    @Input() indexOnScreen: number = 1;

    private _lastEditedCollection?: ICollectionReference;

    public get lastEditedCollection(): ICollectionReference | undefined {
        return this._lastEditedCollection;
    }

    constructor(
        private _modalService: ModalService,
        private _userIdInterceptorService: UserIdInterceptorService,
        private _collectionFormService: CollectionFormService,
        private _collectionRepository: CollectionRepositoryService
    ) {}

    public openModal(modalTemplate: TemplateRef<Element>) {
        this._modalService.open(modalTemplate);
    }

    public async deleteGroup() {
        if (this.collectionGroup === undefined) {
            return;
        }

        const result = await this._modalService.getConfirmation({
            title: `Delete group '${this.collectionGroup.name}'?`,
            description: 'This action will remove the group and all of the collections inside it',
            confirmation: 'This is irreversible. Are you sure?',
            color: this.collectionGroup.color
        });

        if (result) {
            for (let collectionRef of this.collectionGroup.collections) {
                this._collectionRepository.deleteCollection(collectionRef.id);
            }
            this._userIdInterceptorService.deleteCollectionGroup(this.collectionGroup);
        }
    }

    public openEditCollectionModal($event: Event, collection: ICollectionReference, collectionGroupForm: TemplateRef<Element>) {
        $event.stopPropagation();

        this._lastEditedCollection = collection;
        this.openModal(collectionGroupForm);
    }

    public openCreateCollectionModal(collectionGroupForm: TemplateRef<Element>) {
        this._collectionFormService.setCollectionGroup(this.collectionGroup.name);
        this.openModal(collectionGroupForm);
    }

    public async confirmCollectionDelete($event: Event, collection: ICollectionReference) {
        $event.stopPropagation();

        const result = await this._modalService.getConfirmation({
            title: `Delete collection ${collection.name}?`,
            description: `This action will remove the collection and all of the flashcards inside it`,
            confirmation: 'This is irreversible. Are you sure?',
            color: this.collectionGroup.color
        });

        if (result) {
            await this._userIdInterceptorService.deleteCollectionReference(this.collectionGroup.name, collection);
            await this._collectionRepository.deleteCollection(collection.id);
        }
    }
}

