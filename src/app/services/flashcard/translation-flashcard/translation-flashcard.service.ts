import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class TranslationFlashcardService {
    private _formGroup: FormGroup;

    public get formGroup(): FormGroup {
        return this._formGroup;
    }

    constructor(private _formBuilder: FormBuilder) {
        this._formGroup = this._formBuilder.group({
            frontside: this._formBuilder.group({ word: ['', Validators.required], sentence: [''] }),
            backside: this._formBuilder.group({ translation: ['', Validators.required], translatedSentence: [''] })
        });
    }

    public async createFlashcard() {
        console.log(this._formGroup.value);
    }
}

