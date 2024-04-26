import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

export type DropdownMenuProperties<T> = {
    mainButton: string;
    mainButtonTemplate?: TemplateRef<Element>;
    options: { display: string; displayTemplate?: TemplateRef<Element>; emitValue: T }[];
    showArrow: boolean;
    selectBehavior: boolean | { initValue: number };
};

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent<T> implements OnInit {
    @Output() optionClicked: EventEmitter<T>;
    @Input({ required: true }) properties!: DropdownMenuProperties<T>;

    @ViewChild('mainButton') usernameElement: ElementRef | undefined = undefined;
    @ViewChild('options') optionsElement: ElementRef | undefined = undefined;

    private _optionsExpanded: boolean;
    private _selectedValue?: number;

    public get optionsExpanded(): boolean {
        return this._optionsExpanded;
    }

    constructor() {
        this._optionsExpanded = false;
        this.optionClicked = new EventEmitter();
    }

    ngOnInit(): void {
        if (this.properties.selectBehavior && typeof this.properties.selectBehavior !== 'boolean') {
            this._selectedValue = this.properties.selectBehavior.initValue;
        }
    }

    @HostListener('document:click', ['$event'])
    closeOptionsWhenClickedOutside($event: MouseEvent) {
        if (this.usernameElement === undefined || this.optionsElement === undefined) {
            return;
        }

        if (!this.checkIfClickedInside($event, this.usernameElement) && !this.checkIfClickedInside($event, this.optionsElement)) {
            this._optionsExpanded = false;
        }
    }

    private checkIfClickedInside($event: MouseEvent, element: ElementRef) {
        return element.nativeElement.contains($event.target);
    }

    @HostListener('document:keydown.escape', ['$event'])
    closeOptions(): void {
        this._optionsExpanded = false;
    }

    public toggleOptions(): void {
        this._optionsExpanded = !this._optionsExpanded;
    }

    public emitValue(value: T, index: number) {
        this._selectedValue = index;
        this.optionClicked.next(value);
    }

    public isOptionSelected(index: number): boolean {
        if (this._selectedValue === index) {
            return true;
        }
        return false;
    }
}

