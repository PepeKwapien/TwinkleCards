import { AfterViewInit, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { ICollectionReference } from 'src/app/models/documents/collection-reference.document';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionFormService } from 'src/app/services/collection-form/collection-form.service';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserIdInterceptorService } from 'src/app/services/user-id-interceptor/user-id-interceptor.service';

@Component({
    selector: 'app-collection-group',
    templateUrl: './collection-group.component.html',
    styleUrls: ['./collection-group.component.scss']
})
export class CollectionGroupComponent implements AfterViewInit {
    @ViewChild('collectionsGrid') collectionsGrid!: ElementRef;

    @Input({ required: true }) collectionGroup!: IUserCollectionGroup;
    @Input() indexOnScreen: number = 1;

    private _lastEditedCollection?: ICollectionReference;
    private _collectionsCollapsed: boolean;

    public get lastEditedCollection(): ICollectionReference | undefined {
        return this._lastEditedCollection;
    }

    public get collectionsCollapsed(): boolean {
        return this._collectionsCollapsed;
    }

    constructor(
        private _modalService: ModalService,
        private _userIdInterceptorService: UserIdInterceptorService,
        private _collectionFormService: CollectionFormService,
        private _collectionRepository: CollectionRepositoryService,
        private _languageService: LanguageService
    ) {
        this._collectionsCollapsed = false;
    }

    ngAfterViewInit(): void {
        this._manageCollectionGridMaxHeight();
    }

    public toggleCollections() {
        this._collectionsCollapsed = !this._collectionsCollapsed;
        this._manageCollectionGridMaxHeight();
    }

    private _manageCollectionGridMaxHeight(): void {
        if (!this._collectionsCollapsed) {
            this.collectionsGrid.nativeElement.style.maxHeight = this.collectionsGrid.nativeElement.scrollHeight + 'px';
        } else {
            this.collectionsGrid.nativeElement.style.maxHeight = 0;
        }
    }

    public openModal($event: Event, modalTemplate: TemplateRef<Element>) {
        $event.stopPropagation();
        this._modalService.open(modalTemplate);
    }

    public async deleteGroup($event: Event) {
        $event.stopPropagation();
        if (this.collectionGroup === undefined) {
            return;
        }

        const result = await this._modalService.getConfirmation({
            title: this._languageService.languageResouce.getDeleteGroupTitle(this.collectionGroup.name),
            description: this._languageService.languageResouce.deleteCollectionGroupDescription,
            confirmation: this._languageService.languageResouce.irreversibleConfirmation,
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
        this._modalService.open(collectionGroupForm);
    }

    public openCreateCollectionModal(collectionGroupForm: TemplateRef<Element>) {
        this._collectionFormService.setCollectionGroup(this.collectionGroup.name);
        this._modalService.open(collectionGroupForm);
    }

    public async confirmCollectionDelete($event: Event, collection: ICollectionReference) {
        $event.stopPropagation();

        const result = await this._modalService.getConfirmation({
            title: this._languageService.languageResouce.getDeleteCollectionTitle(collection.name),
            description: this._languageService.languageResouce.deleteCollectionDescription,
            confirmation: this._languageService.languageResouce.irreversibleConfirmation,
            color: this.collectionGroup.color
        });

        if (result) {
            await this._userIdInterceptorService.deleteCollectionReference(this.collectionGroup.name, collection);
            await this._collectionRepository.deleteCollection(collection.id);
        }
    }
}
