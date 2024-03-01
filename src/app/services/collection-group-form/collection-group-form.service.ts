import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserIdInterceptorService } from '../user-id-interceptor/user-id-interceptor.service';

@Injectable({
    providedIn: 'root'
})
export class CollectionGroupFormService {
    private _formGroup: FormGroup;

    public get nameFormControl(): FormGroup {
        return this._formGroup;
    }

    constructor(private _userIdInterceptorService: UserIdInterceptorService, private _formBuilder: FormBuilder) {
        this._formGroup = this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(1)]],
            color: ['']
        });
    }

    public createCollectionGroup() {
        if (this._formGroup.valid) {
            this._userIdInterceptorService.createCollectionGroup(this._formGroup.value as { name: string; color: string });
        }
    }

    public resetNameFormControl(): void {
        this._formGroup.reset();
    }
}

