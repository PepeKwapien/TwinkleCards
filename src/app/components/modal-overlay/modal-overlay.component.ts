import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';

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

    public get actionProperties$(): Observable<{ title: string; description: string }> {
        return this._modalService.actionTitle$;
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

    constructor(private _modalService: ModalService) {}

    public close(): void {
        this._modalService.close();
    }

    public confirm(): void {
        this._modalService.confirm();
    }
}

