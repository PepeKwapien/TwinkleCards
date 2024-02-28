import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserRepositoryService } from '../user-repository/user-repository.service';
import { AuthService } from '../auth/auth.service';
import { UserIdInterceptorService } from '../user-id-interceptor/user-id-interceptor.service';

@Injectable({
    providedIn: 'root'
})
export class CollectionGroupFormService {
    private _nameFormControl: FormControl<string>;

    public get nameFormControl(): FormControl<string> {
        return this._nameFormControl;
    }

    constructor(private _userIdInterceptorService: UserIdInterceptorService) {
        this._nameFormControl = new FormControl();
        this._nameFormControl.addValidators([Validators.required, Validators.minLength(1)]);
    }

    public createCollectionGroup() {
        if (this._nameFormControl.valid) {
            this._userIdInterceptorService.createCollectionGroup(this._nameFormControl.value);
        }
    }

    public resetNameFormControl(): void {
        this._nameFormControl.reset();
    }
}

