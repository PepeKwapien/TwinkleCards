import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CollectionGroupColorEnum } from 'src/app/helpers/colors.helper';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';

@Component({
    selector: 'app-collection-group-form-body',
    templateUrl: './collection-group-form-body.component.html',
    styleUrls: ['./collection-group-form-body.component.scss']
})
export class CollectionGroupFormBodyComponent {
    public get formGroup(): FormGroup {
        return this._collectionFormGorupService.formGroup;
    }

    public get colors(): string[] {
        return Object.keys(CollectionGroupColorEnum).filter((key) => isNaN(+key));
    }

    constructor(private _collectionFormGorupService: CollectionGroupFormService) {}

    public isColorSelected(color: string): boolean {
        return this.formGroup.get('color')?.value === color;
    }

    public changeColor(color: string) {
        this.formGroup.patchValue({ color });
        console.log(this.formGroup.get('color')?.value);
    }
}

