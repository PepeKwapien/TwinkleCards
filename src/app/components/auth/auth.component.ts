import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DropdownMenuProperties } from '../dropdown-menu/dropdown-menu.component';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    public get isUserAuthenticated(): boolean {
        return this._authService.isUserAuthenticated;
    }

    public get username(): string {
        return this._authService.username;
    }

    public get userDropdownOptions(): DropdownMenuProperties<string> {
        return { mainButton: this.username, options: [{ display: 'Sign out', emitValue: '' }], showArrow: true };
    }

    constructor(private _authService: AuthService) {}

    public async signWithGooglePopup(): Promise<void> {
        await this._authService.signWithGooglePopup();
    }

    public async signOut(): Promise<void> {
        await this._authService.signOut();
    }
}
