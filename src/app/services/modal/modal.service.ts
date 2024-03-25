import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { CollectionGroupColorType } from 'src/app/helpers/colors.helper';

export type ConfirmActionProperties = {
    title: string;
    description: string;
    confirmation?: string;
    color?: CollectionGroupColorType;
};

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private _DEFAULT_ACTION_PROPERTIES: ConfirmActionProperties = {
        title: 'Irreversible action',
        description: 'Are you sure?',
        color: 'pink'
    };
    private _showModal: BehaviorSubject<boolean>;
    private _setTemplate: BehaviorSubject<TemplateRef<any> | undefined>;
    private _actionProperties: BehaviorSubject<ConfirmActionProperties>;
    private _confirmDecision: Subject<boolean>;

    public get showModal$(): Observable<boolean> {
        return this._showModal.asObservable();
    }

    public get setTemplate$(): Observable<TemplateRef<any> | undefined> {
        return this._setTemplate.asObservable();
    }

    public get actionTitle$(): Observable<ConfirmActionProperties> {
        return this._actionProperties.asObservable();
    }

    constructor() {
        this._showModal = new BehaviorSubject<boolean>(false);
        this._setTemplate = new BehaviorSubject<TemplateRef<any> | undefined>(undefined);
        this._confirmDecision = new Subject();
        this._actionProperties = new BehaviorSubject<ConfirmActionProperties>(this._DEFAULT_ACTION_PROPERTIES);
    }

    public close(): void {
        this._showModal.next(false);
        this._confirmDecision.next(false);
    }

    public open(template: TemplateRef<any>): void {
        this._setTemplate.next(template);
        this._showModal.next(true);
    }

    public confirm() {
        this._confirmDecision.next(true);
        this._showModal.next(false);
    }

    public getConfirmation(actionProperties?: ConfirmActionProperties): Promise<boolean> {
        this._actionProperties.next(!actionProperties ? this._DEFAULT_ACTION_PROPERTIES : actionProperties);
        this._setTemplate.next(undefined);
        this._showModal.next(true);

        return firstValueFrom(this._confirmDecision);
    }
}

