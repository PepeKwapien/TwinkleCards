import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IModalProperties } from 'src/app/types/modal-properties.type';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ConfirmActionProperties } from 'src/app/types/confirm-action-properties.type';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-modal-overlay',
    templateUrl: './modal-overlay.component.html',
    styleUrls: ['./modal-overlay.component.scss']
})
export class ModalOverlayComponent {
    @ViewChild('default') defaultTemplate!: TemplateRef<any>;

    public get showModal$(): Observable<boolean> {
        return this._modalService.showModal$;
    }

    public get confirmProperties$(): Observable<ConfirmActionProperties> {
        return this._modalService.confirmProperties$;
    }

    public get modalProperties$(): Observable<IModalProperties> {
        return this._modalService.modalProperties$;
    }

    public get setTemplate$(): Observable<TemplateRef<any> | undefined> {
        return this._modalService.setTemplate$.pipe(
            map((value) => {
                if (value === undefined) {
                    return this.defaultTemplate;
                }
                return value;
            })
        );
    }

    public get confirmButtonText(): string {
        return this._languageService.languageResouce.confirmButton;
    }

    public get cancelButtonText(): string {
        return this._languageService.languageResouce.cancelButton;
    }

    constructor(private _modalService: ModalService, private _languageService: LanguageService) {}

    public close(): void {
        this._modalService.close();
    }

    public confirm(): void {
        this._modalService.confirm();
    }
}
