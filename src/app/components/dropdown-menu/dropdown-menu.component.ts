import { Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';

export type DropdownMenuProperties<T> = {
    mainButton: string;
    mainButtonTemplate?: TemplateRef<Element>;
    options: { display: string; displayTemplate?: TemplateRef<Element>; emitValue: T }[];
    showArrow: boolean;
};

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent<T> {
    @Output() optionClicked: EventEmitter<T>;
    @Input({ required: true }) properties!: DropdownMenuProperties<T>;

    @ViewChild('mainButton') usernameElement: ElementRef | undefined = undefined;
    @ViewChild('options') optionsElement: ElementRef | undefined = undefined;

    public optionsExpanded: boolean;

    constructor() {
        this.optionsExpanded = false;
        this.optionClicked = new EventEmitter();
    }

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
        return element.nativeElement.contains($event.target);
    }

    @HostListener('document:keydown.escape', ['$event'])
    closeOptions(): void {
        this.optionsExpanded = false;
    }

    public toggleOptions(): void {
        this.optionsExpanded = !this.optionsExpanded;
    }

    public emitValue(value: T) {
        this.optionClicked.next(value);
    }
}

