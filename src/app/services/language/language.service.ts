import { Injectable } from '@angular/core';
import { English } from 'src/app/language/english';
import { ILanguareResource } from 'src/app/language/language-resource.interface';
import { Polish } from 'src/app/language/polish';

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

        if (this._userLanguage.includes('pl')) {
            this._languageResource = new Polish();
        } else {
            this._languageResource = new English();
        }
    }
}

