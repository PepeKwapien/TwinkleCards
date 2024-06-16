import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { IModalProperties } from 'src/app/types/modal-properties.type';
import { ConfirmActionProperties } from 'src/app/types/confirm-action-properties.type';
import { LanguageService } from '../language/language.service';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private _DEFAULT_MODAL_PROPERTIES: IModalProperties = {
        showClose: true,
        transparentBackground: true
    };
    private _DEFAULT_ACTION_PROPERTIES: ConfirmActionProperties = {
        title: this._languageService.languageResouce.defaultConfirmActionTitle,
        description: this._languageService.languageResouce.defaultConfirmActionDescription,
        color: 'pink'
    };
    private _showModal: BehaviorSubject<boolean>;
    private _setTemplate: BehaviorSubject<TemplateRef<any> | undefined>;
    private _modalProperties: BehaviorSubject<IModalProperties>;
    private _confirmProperties: BehaviorSubject<ConfirmActionProperties>;
    private _confirmDecision: Subject<boolean>;

    public get showModal$(): Observable<boolean> {
        return this._showModal.asObservable();
    }

    public get setTemplate$(): Observable<TemplateRef<any> | undefined> {
        return this._setTemplate.asObservable();
    }

    public get confirmProperties$(): Observable<ConfirmActionProperties> {
        return this._confirmProperties.asObservable();
    }

    public get modalProperties$(): Observable<IModalProperties> {
        return this._modalProperties.asObservable();
    }

    constructor(private _languageService: LanguageService) {
        this._showModal = new BehaviorSubject<boolean>(false);
        this._setTemplate = new BehaviorSubject<TemplateRef<any> | undefined>(undefined);
        this._confirmDecision = new Subject();
        this._confirmProperties = new BehaviorSubject<ConfirmActionProperties>(this._DEFAULT_ACTION_PROPERTIES);
        this._modalProperties = new BehaviorSubject<IModalProperties>(this._DEFAULT_MODAL_PROPERTIES);
    }

    public close(): void {
        this._showModal.next(false);
        this._confirmDecision.next(false);
    }

    public open(
        template: TemplateRef<any>,
        modalProperties: IModalProperties = { showClose: true, transparentBackground: true }
    ): void {
        this._setTemplate.next(template);
        this._modalProperties.next(modalProperties);
        this._showModal.next(true);
    }

    public confirm() {
        this._confirmDecision.next(true);
        this._showModal.next(false);
    }

    public getConfirmation(confirmProperties?: ConfirmActionProperties): Promise<boolean> {
        this._confirmProperties.next(!confirmProperties ? this._DEFAULT_ACTION_PROPERTIES : confirmProperties);
        this._modalProperties.next(this._DEFAULT_MODAL_PROPERTIES);
        this._setTemplate.next(undefined);
        this._showModal.next(true);

        return firstValueFrom(this._confirmDecision);
    }
}
