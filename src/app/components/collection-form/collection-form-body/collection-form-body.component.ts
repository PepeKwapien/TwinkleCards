import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CollectionFormService } from '../../../services/collection-form/collection-form.service';

@Component({
    selector: 'app-collection-form-body',
    templateUrl: './collection-form-body.component.html',
    styleUrls: ['./collection-form-body.component.scss']
})
export class CollectionFormBodyComponent {
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;

    public get formGroup(): FormGroup {
        return this._collectionFormService.formGroup;
    }

    constructor(private _collectionFormService: CollectionFormService) {}

    public async callback($event: Event) {
        $event.preventDefault();
        await this.buttonCallback();
    }
}
