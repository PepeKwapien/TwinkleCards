import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from '../modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class CollectionFormService implements OnDestroy {
    private _formGroup: FormGroup;
    private _resetFormSubscription: Subscription;

    public get formGroup(): FormGroup {
        return this._formGroup;
    }

    constructor(private _formBuilder: FormBuilder, private _modalService: ModalService) {
        this._formGroup = this._formBuilder.group({ name: ['', Validators.required], description: [''] });
        this._resetFormSubscription = this._modalService.closeModal$.subscribe(() => this._resetFormGroup());
    }

    ngOnDestroy(): void {
        this._resetFormSubscription.unsubscribe();
    }

    public async createCollection(): Promise<void> {
        return;
    }

    private _resetFormGroup(): void {
        this._formGroup.reset();
    }
}

