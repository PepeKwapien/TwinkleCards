import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
    private _routingHistory: string[] = [];
    private _navigationSub: Subscription;

    public get displayBackArrow(): boolean {
        return this._router.url !== '/home' && this._router.url !== '/';
    }

    constructor(private _router: Router, private _location: Location) {
        this._navigationSub = this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this._routingHistory.push(event.urlAfterRedirects);
            }
        });
    }

    ngOnDestroy(): void {
        this._navigationSub.unsubscribe();
    }

    navigateBack() {
        this._routingHistory.pop();
        if (this._routingHistory.length > 0) {
            this._location.back();
        } else {
            this._router.navigateByUrl('/home');
        }
    }
}

