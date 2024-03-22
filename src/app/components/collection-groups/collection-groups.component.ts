import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDocument } from 'src/app/models/documents/user.document';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-collection-groups',
    templateUrl: './collection-groups.component.html',
    styleUrls: ['./collection-groups.component.scss'],
    animations: [
        trigger('slideFromLeft', [transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('0.5s ease')])])
    ]
})
export class CollectionGroupsComponent implements AfterViewInit {
    public wasAnimationPlayed: boolean = false;

    public get user$(): Observable<UserDocument> {
        return this._authService.user$;
    }

    constructor(private _authService: AuthService, private _modalService: ModalService) {}

    ngAfterViewInit() {
        setTimeout(() => (this.wasAnimationPlayed = true), 2000);
    }

    public openModal(collectionGroupForm: TemplateRef<any>) {
        this._modalService.open(collectionGroupForm);
    }
}

