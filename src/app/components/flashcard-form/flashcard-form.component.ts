import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-flashcard-form',
    templateUrl: './flashcard-form.component.html',
    styleUrls: ['./flashcard-form.component.scss']
})
export class FlashcardFormComponent {
    @Input({ required: true }) formTitle!: string;
    @Input({ required: true }) formGroup!: FormGroup;
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;

    public formFlipped: boolean = false;

    public flip() {
        this.formFlipped = !this.formFlipped;
    }

    public async callback($event: Event) {
        $event.preventDefault();
        await this.buttonCallback();
    }
}

