import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Host, HostListener, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    animations: [
        trigger('slideAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(-20%)', opacity: 0 }),
                animate('200ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0)', opacity: 1 }),
                animate('200ms ease-in', style({ transform: 'translateY(-20%)', opacity: 0 }))
            ])
        ])
    ]
})
export class AuthComponent {
    public optionsExpanded: boolean;

    @ViewChild('usernameButton') usernameElement: ElementRef | undefined = undefined;
    @ViewChild('options') optionsElement: ElementRef | undefined = undefined;

    @HostListener('document:click', ['$event'])
    closeOptionsWhenClickedOutside($event: MouseEvent) {
        if (this.usernameElement === undefined || this.optionsElement === undefined) {
            return;
        }

        if (!this.checkIfClickedInside($event, this.usernameElement) && !this.checkIfClickedInside($event, this.optionsElement)) {
            this.optionsExpanded = false;
        }
    }

    private checkIfClickedInside($event: MouseEvent, element: ElementRef) {
        const elementDimensions = element.nativeElement.getBoundingClientRect();
        if (
            $event.clientX < elementDimensions.left ||
            $event.clientX > elementDimensions.right ||
            $event.clientY < elementDimensions.top ||
            $event.clientY > elementDimensions.bottom
        ) {
            return false;
        }
        return true;
    }

    @HostListener('document:keydown.escape', ['$event'])
    closeOptions(): void {
        this.optionsExpanded = false;
    }

    constructor(private _authService: AuthService) {
        this.optionsExpanded = false;
    }

    public get username(): string {
        return this._authService.username;
    }

    public get isUserAuthenticated(): boolean {
        return this._authService.isUserAuthenticated;
    }
    public async signWithGooglePopup(): Promise<void> {
        await this._authService.signWithGooglePopup();
    }

    public async signOut(): Promise<void> {
        await this._authService.signOut();
        this.optionsExpanded = false;
    }

    public toggleOptions(): void {
        this.optionsExpanded = !this.optionsExpanded;
    }
}

