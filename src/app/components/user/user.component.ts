import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    constructor(private _authService: AuthService) {}

    public get username(): string {
        return this._authService.username;
    }

    public get isUserAuthenticated(): boolean {
        return this._authService.isUserAuthenticated;
    }
    public async signWithGooglePopup(): Promise<void> {
        await this._authService.signWithGooglePopup();
    }

    public async singOut() {
        await this._authService.signOut();
    }
}

