import { AfterContentChecked, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterContentChecked {
    @Input({ required: true }) elementToMatchHeight!: HTMLElement;

    constructor(private _hostElement: ElementRef) {}

    ngAfterContentChecked(): void {
        const hostHeight = this._hostElement.nativeElement.scrollHeight;
        const otherHeight = this.elementToMatchHeight.scrollHeight;
        const maxHeight = Math.max(hostHeight, otherHeight);

        this._hostElement.nativeElement.style.height = `${maxHeight}px`;
        this.elementToMatchHeight.style.height = `${maxHeight}px`;
    }
}

