import { AfterViewInit, Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-flashcard-form',
    templateUrl: './flashcard-form.component.html',
    styleUrls: ['./flashcard-form.component.scss']
})
export class FlashcardFormComponent implements AfterViewInit {
    @Input({ required: true }) formTitle!: string;
    @Input({ required: true }) formGroup!: FormGroup;
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;

    public get formFlipped(): boolean {
        return this._formFlipped;
    }

    public _formFlipped: boolean = false;

    public get isOtherSideInvalid(): boolean {
        if (this._formFlipped) {
            return !this.formGroup.get('frontside')?.valid;
        } else {
            return !this.formGroup.get('backside')?.valid;
        }
    }

    ngAfterViewInit(): void {
        this._focusOnFrontside();
    }

    public flip() {
        this._formFlipped = !this._formFlipped;

        if (!this._formFlipped) {
            this._focusOnFrontside();
        } else {
            this._focusOnBackside();
        }
    }

    public async callback($event: Event) {
        $event.preventDefault();
        await this.buttonCallback();
    }

    private _focusOnFrontside(): void {
        // unfocus backside
        if (document.getElementById('backsideFirst') != null) {
            document.getElementById('backsideFirst')!.tabIndex = -1;
        }
        if (document.getElementById('backsideSecond')) {
            document.getElementById('backsideSecond')!.tabIndex = -1;
        }

        // allow focusing frontside
        if (document.getElementById('frontsideFirst') != null) {
            document.getElementById('frontsideFirst')!.tabIndex = 0;
        }
        if (document.getElementById('frontsideSecond')) {
            document.getElementById('frontsideSecond')!.tabIndex = 0;
        }

        document.getElementById('frontsideFirst')?.focus();
    }

    private _focusOnBackside(): void {
        // allow focusing backside
        if (document.getElementById('backsideFirst') != null) {
            document.getElementById('backsideFirst')!.tabIndex = 0;
        }
        if (document.getElementById('backsideSecond')) {
            document.getElementById('backsideSecond')!.tabIndex = 0;
        }

        // unfocus frontside
        if (document.getElementById('frontsideFirst') != null) {
            document.getElementById('frontsideFirst')!.tabIndex = -1;
        }
        if (document.getElementById('frontsideSecond')) {
            document.getElementById('frontsideSecond')!.tabIndex = -1;
        }

        document.getElementById('backsideFirst')?.focus();
    }
}

