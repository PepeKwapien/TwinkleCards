import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-modal-overlay',
    templateUrl: './modal-overlay.component.html',
    styleUrls: ['./modal-overlay.component.scss']
})
export class ModalOverlayComponent {
    private _setTemplate: TemplateRef<any> | undefined;
    @ViewChild('default') defaultTemplate!: TemplateRef<any>;

    public get showModal$(): Observable<boolean> {
        return this._modalService.showModal$;
    }

    public get setTemplate$(): Observable<TemplateRef<any> | undefined> {
        return this._modalService.setTemplate$;
    }

    constructor(private _modalService: ModalService) {}

    public close(): void {
        this._modalService.close();
    }
}

