import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CollectionGroupColorEnum } from 'src/app/enums/collection-group-color.enum';
import { CollectionGroupFormService } from 'src/app/services/collection-group-form/collection-group-form.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-collection-group-form-body',
    templateUrl: './collection-group-form-body.component.html',
    styleUrls: ['./collection-group-form-body.component.scss']
})
export class CollectionGroupFormBodyComponent implements OnDestroy {
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;

    public get formGroup(): FormGroup {
        return this._collectionFormGorupService.formGroup;
    }

    public get colors(): string[] {
        return Object.keys(CollectionGroupColorEnum).filter((key) => isNaN(+key));
    }

    public get nameText(): string {
        return this._languageService.languageResouce.name;
    }

    public get colorText(): string {
        return this._languageService.languageResouce.color;
    }

    constructor(private _collectionFormGorupService: CollectionGroupFormService, private _languageService: LanguageService) {}

    ngOnDestroy(): void {
        this._collectionFormGorupService.resetFormGroup();
    }

    public changeColor(color: string) {
        this.formGroup.patchValue({ color });
    }

    public async callback($event: Event) {
        $event.preventDefault();
        await this.buttonCallback();
    }
}

