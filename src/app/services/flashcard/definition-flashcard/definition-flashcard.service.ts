import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class DefinitionFlashcardService {
    private _formGroup: FormGroup;

    public get formGroup(): FormGroup {
        return this._formGroup;
    }

    constructor(private _formBuilder: FormBuilder) {
        this._formGroup = this._formBuilder.group({
            frontside: this._formBuilder.group({ term: ['', Validators.required] }),
            backside: this._formBuilder.group({ definition: ['', Validators.required] })
        });
    }

    public async createFlashcard() {
        console.log(this._formGroup.value);
    }
}

