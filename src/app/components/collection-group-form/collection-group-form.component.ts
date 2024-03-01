import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CollectionGroupColorEnum } from 'src/app/helpers/colors.helper';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';

@Component({
    selector: 'app-collection-group-form',
    templateUrl: './collection-group-form.component.html',
    styleUrls: ['./collection-group-form.component.scss']
})
export class CollectionGroupFormComponent {
    @Output() formSubmited: EventEmitter<string>;

    public get formGroup(): FormGroup {
        return this._collectionFormGorupService.nameFormControl;
    }

    public get colors(): string[] {
        return Object.keys(CollectionGroupColorEnum).filter((key) => isNaN(+key));
    }

    constructor(private _collectionFormGorupService: CollectionGroupFormService) {
        this.formSubmited = new EventEmitter();
    }

    public createCollectionGroup($event: Event) {
        $event.preventDefault();
        if (this.formGroup.valid) {
            this._collectionFormGorupService.createCollectionGroup();
            this.formSubmited.emit(this.formGroup.value);
        }
    }

    public isColorSelected(color: string): boolean {
        return this.formGroup.get('color')?.value === color;
    }

    public changeColor(color: string) {
        this.formGroup.patchValue({ color });
        console.log(this.formGroup.get('color')?.value);
    }
}
