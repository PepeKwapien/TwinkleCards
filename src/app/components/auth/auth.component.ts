import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DropdownMenuProperties } from '../dropdown-menu/dropdown-menu.component';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit {
    @ViewChild('usernameTemplate') usernameTemplate!: TemplateRef<Element>;

    private _userDropdownOptions: DropdownMenuProperties<string>;

    public get isUserAuthenticated(): boolean {
        return this._authService.isUserAuthenticated;
    }

    public get username(): string {
        return this._authService.username;
    }

    public get userDropdownOptions(): DropdownMenuProperties<string> {
        return this._userDropdownOptions;
    }

    constructor(private _authService: AuthService) {
        this._userDropdownOptions = {
            mainButton: this.username,
            options: [{ display: 'Sign out', emitValue: '' }],
            showArrow: true,
            selectBehavior: false
        };
    }

    ngAfterViewInit(): void {
        this._userDropdownOptions.mainButton = '';
        this._userDropdownOptions.mainButtonTemplate = this.usernameTemplate;
    }

    public async signWithGooglePopup(): Promise<void> {
        await this._authService.signWithGooglePopup();
    }

    public async signOut(): Promise<void> {
        await this._authService.signOut();
    }
}
