import { Component } from '@angular/core';

@Component({
    selector: 'app-definition-flashcard-form',
    templateUrl: './definition-flashcard-form.component.html',
    styleUrls: ['./definition-flashcard-form.component.scss']
})
export class DefinitionFlashcardFormComponent {
    public formFlipped: boolean = false;

    public flip() {
        this.formFlipped = !this.formFlipped;
    }
}

