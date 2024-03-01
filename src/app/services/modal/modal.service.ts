import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private _DEFAULT_ACTION_PROPERTIES = {
        title: 'Irreversible action',
        description: 'Are you sure?'
    };
    private _showModal: BehaviorSubject<boolean>;
    private _setTemplate: BehaviorSubject<TemplateRef<any> | undefined>;
    private _actionProperties: BehaviorSubject<{ title: string; description: string }>;
    private _confirmDecision: Subject<boolean>;

    public get showModal$(): Observable<boolean> {
        return this._showModal.asObservable();
    }

    public get closeModal$(): Observable<boolean> {
        return this._showModal.asObservable().pipe(filter((value) => !value));
    }

    public get setTemplate$(): Observable<TemplateRef<any> | undefined> {
        return this._setTemplate.asObservable();
    }

    public get actionTitle$(): Observable<{ title: string; description: string }> {
        return this._actionProperties.asObservable();
    }

    constructor() {
        this._showModal = new BehaviorSubject<boolean>(false);
        this._setTemplate = new BehaviorSubject<TemplateRef<any> | undefined>(undefined);
        this._confirmDecision = new Subject();
        this._actionProperties = new BehaviorSubject<{ title: string; description: string }>(this._DEFAULT_ACTION_PROPERTIES);
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

    public getConfirmation(actionProperties?: { title: string; description: string }): Promise<boolean> {
        this._actionProperties.next(!actionProperties ? this._DEFAULT_ACTION_PROPERTIES : actionProperties);
        this._setTemplate.next(undefined);
        this._showModal.next(true);

        return firstValueFrom(this._confirmDecision);
    }
}
