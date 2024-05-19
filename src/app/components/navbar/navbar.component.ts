import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('arrow', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-100%) translateY(-50%)' }),
                animate('0.3s', style({ opacity: 1, transform: 'translateX(0%) translateY(-50%)' }))
            ]),
            transition(':leave', [animate('0.3s', style({ opacity: 0, transform: 'translateX(-100%) translateY(-50%)' }))])
        ])
    ]
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

    public navigateBack() {
        this._routingHistory.pop();
        if (this._routingHistory.length > 0) {
            this._location.back();
        } else {
            this._router.navigateByUrl('/home');
        }
    }

    public navigateToSearch(term: string) {
        this._router.navigateByUrl(`search/${term}`);
    }
}

