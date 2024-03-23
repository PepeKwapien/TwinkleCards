import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CollectionFormService } from '../../../services/collection-form/collection-form.service';
import { UserRepositoryService } from 'src/app/services/user-repository/user-repository.service';

@Component({
    selector: 'app-collection-form-body',
    templateUrl: './collection-form-body.component.html',
    styleUrls: ['./collection-form-body.component.scss']
})
export class CollectionFormBodyComponent implements OnDestroy {
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;
    @Input() editForm: boolean = false;

    public get formGroup(): FormGroup {
        return this._collectionFormService.formGroup;
    }

    public get collectionGroups(): string[] {
        return this._userRepository.userCollectionGroupNames;
    }

    constructor(private _collectionFormService: CollectionFormService, private _userRepository: UserRepositoryService) {}

    ngOnDestroy(): void {
        this._collectionFormService.resetFormGroup();
    }

    public async callback($event: Event) {
        $event.preventDefault();
        await this.buttonCallback();
    }
}

