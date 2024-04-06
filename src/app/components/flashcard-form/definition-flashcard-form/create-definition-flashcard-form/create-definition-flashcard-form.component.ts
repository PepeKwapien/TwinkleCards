import { Component, Input } from '@angular/core';
import { DefinitionFlashcardService } from 'src/app/services/flashcard/definition-flashcard/definition-flashcard.service';

@Component({
    selector: 'app-create-definition-flashcard-form',
    templateUrl: './create-definition-flashcard-form.component.html',
    styleUrls: ['./create-definition-flashcard-form.component.scss'],
    providers: [DefinitionFlashcardService]
})
export class CreateDefinitionFlashcardFormComponent {
    @Input({ required: true }) collectionId!: string;

    constructor(private _flashcardService: DefinitionFlashcardService) {}

    public createDefinitionFlashcard() {
        return () => this._flashcardService.createFlashcard(this.collectionId);
    }
}

