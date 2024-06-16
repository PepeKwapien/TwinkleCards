import { Injectable } from '@angular/core';
import { English } from 'src/app/language/english';
import { ILanguareResource } from 'src/app/language/language-resource.interface';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private _userLanguage: string;
    private _languageResource: ILanguareResource;

    public get languageResouce(): ILanguareResource {
        return this._languageResource;
    }

    constructor() {
        this._userLanguage = window.navigator.language;
        this._languageResource = new English();
    }
}

