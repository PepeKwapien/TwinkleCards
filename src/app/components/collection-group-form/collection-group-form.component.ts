import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';

@Component({
    selector: 'app-collection-group-form',
    templateUrl: './collection-group-form.component.html',
    styleUrls: ['./collection-group-form.component.scss']
})
export class CollectionGroupFormComponent {
    @Output() formSubmited: EventEmitter<string>;

    public get nameFormControl(): FormControl<string> {
        return this._collectionFormGorupService.nameFormControl;
    }

    constructor(private _collectionFormGorupService: CollectionGroupFormService) {
        this.formSubmited = new EventEmitter();
    }

    public createCollectionGroup($event: Event) {
        $event.preventDefault();
        if (this.nameFormControl.valid) {
            this._collectionFormGorupService.createCollectionGroup();
            this.formSubmited.emit(this.nameFormControl.value);
        }
    }
}

