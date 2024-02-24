import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDocument } from 'src/app/models/documents/user.document';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-collection-groups',
    templateUrl: './collection-groups.component.html',
    styleUrls: ['./collection-groups.component.scss']
})
export class CollectionGroupsComponent {
    public get firebaseUser$(): Observable<UserDocument> {
        return this._authService.firebaseUser$;
    }

    constructor(private _authService: AuthService) {}
}

