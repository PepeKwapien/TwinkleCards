import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-user-loading-guard',
    templateUrl: './user-loading-guard.component.html',
    styleUrls: ['./user-loading-guard.component.scss']
})
export class UserLoadingGuardComponent {
    public isUserEstimated: boolean;

    constructor(private _authService: AuthService, private _router: Router) {
        this.isUserEstimated = this._authService.isUserAuthenticated;

        this._authService.registerOnAuthStateChanged((user) => {
            this.isUserEstimated = true;
            if (this._router.url === '/' && user !== null) {
                this._router.navigate([`home`]);
            } else if (this._router.url === '/home' && user == null) {
                this._router.navigate([`/`]);
            }
        });
    }
}
