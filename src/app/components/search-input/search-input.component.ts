import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnDestroy {
    @ViewChild('input') input!: ElementRef;
    @ViewChild('button') button!: ElementRef;
    @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();
    @Output() searchTermEnter: EventEmitter<string> = new EventEmitter<string>();
    @Input() sendWithEnter = false;

    private _sub: Subscription;
    private _formControl: FormControl = new FormControl({ value: '', disabled: true });
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
        const clickedInsideInput = this._checkIfClickedInside($event, this.input);
        const clickedInsideButton = this._checkIfClickedInside($event, this.button);

        if (this._isActive && !clickedInsideInput && !clickedInsideButton) {
            this._isActive = false || this.formControl.value.length > 0;
        }

        this._manageInputState();
    }

    @HostListener('document:keydown.escape', ['$event'])
    closeOptions(): void {
        this._isActive = false || this.formControl.value.length > 0;
        this._manageInputState();
    }

    public onIconClick() {
        if (!this._isActive) {
            this._isActive = true;
        } else {
            this._isActive = false || this.formControl.value.length > 0;
        }

        if (this.sendWithEnter && this.formControl.value.length > 0) {
            this.searchTermEnter.emit(this.formControl.value);
        }

        this._manageInputState();
    }

    public onKeyPress($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            $event.preventDefault();
            this.searchTermEnter.emit(this._formControl.value);
        }
    }

    private _checkIfClickedInside($event: MouseEvent, element: ElementRef) {
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

    private _manageInputState() {
        if (this._isActive) {
            this._formControl.enable();
        } else {
            this._formControl.disable();
        }
    }
}

