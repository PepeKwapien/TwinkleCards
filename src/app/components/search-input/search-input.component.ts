import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnDestroy {
    @ViewChild('input') input!: ElementRef;
    @ViewChild('icon') icon!: ElementRef;
    @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();

    private _sub: Subscription;
    private _formControl: FormControl = new FormControl();
    private _isActive: boolean = false;

    public get formControl(): FormControl {
        return this._formControl;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    constructor() {
        this._sub = this.formControl.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(300))
            .subscribe({ next: (value) => this.searchTerm.emit(value) });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    @HostListener('document:click', ['$event'])
    closeOptionsWhenClickedOutside($event: MouseEvent) {
        if (this.input === undefined || this.icon === undefined) {
            return;
        }

        if (this._isActive && !this.checkIfClickedInside($event, this.input) && !this.checkIfClickedInside($event, this.icon)) {
            this._isActive = false;
        }
    }

    private checkIfClickedInside($event: MouseEvent, element: ElementRef) {
        return element.nativeElement.contains($event.target);
    }

    @HostListener('document:keydown.escape', ['$event'])
    closeOptions(): void {
        this._isActive = false;
    }

    public onIconClick() {
        if (!this._isActive) {
            this._isActive = true;
        } else {
            this._isActive = false;
        }
    }
}

