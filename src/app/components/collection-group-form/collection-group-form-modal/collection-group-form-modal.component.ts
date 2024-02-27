import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-collection-group-form-modal',
    templateUrl: './collection-group-form-modal.component.html',
    styleUrls: ['./collection-group-form-modal.component.scss']
})
export class CollectionGroupFormModalComponent implements OnDestroy {
    private _resetFormSubscription: Subscription;

    constructor(private _modalService: ModalService, private _collectionGroupFormService: CollectionGroupFormService) {
        this._resetFormSubscription = this._modalService.closeModal$.subscribe(() =>
            this._collectionGroupFormService.resetNameFormControl()
        );
    }

    ngOnDestroy(): void {
        this._resetFormSubscription.unsubscribe();
    }

    public closeFormModal() {
        this._modalService.close();
    }
}

