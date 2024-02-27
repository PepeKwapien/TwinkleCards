import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private _showModal: BehaviorSubject<boolean>;
    private _setTemplate: BehaviorSubject<TemplateRef<any> | undefined>;

    public get showModal$(): Observable<boolean> {
        return this._showModal.asObservable();
    }

    public get closeModal$(): Observable<boolean> {
        return this._showModal.asObservable().pipe(filter((value) => !value));
    }

    public get setTemplate$(): Observable<TemplateRef<any> | undefined> {
        return this._setTemplate.asObservable();
    }

    constructor() {
        this._showModal = new BehaviorSubject<boolean>(false);
        this._setTemplate = new BehaviorSubject<TemplateRef<any> | undefined>(undefined);
    }

    public close(): void {
        this._showModal.next(false);
    }

    public open(template: TemplateRef<any>): void {
        this._setTemplate.next(template);
        this._showModal.next(true);
    }
}

