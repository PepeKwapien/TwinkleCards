import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CollectionGroupColorEnum } from 'src/app/helpers/colors.helper';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';

@Component({
    selector: 'app-collection-group-form-body',
    templateUrl: './collection-group-form-body.component.html',
    styleUrls: ['./collection-group-form-body.component.scss']
})
export class CollectionGroupFormBodyComponent {
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;

    public get formGroup(): FormGroup {
        return this._collectionFormGorupService.formGroup;
    }

    public get colors(): string[] {
        return Object.keys(CollectionGroupColorEnum).filter((key) => isNaN(+key));
    }

    constructor(private _collectionFormGorupService: CollectionGroupFormService) {}

    public changeColor(color: string) {
        this.formGroup.patchValue({ color });
    }

    public async callback($event: Event) {
        $event.preventDefault();
        await this.buttonCallback();
    }
}

