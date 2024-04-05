import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-definition-flashcard-form',
    templateUrl: './definition-flashcard-form.component.html',
    styleUrls: ['./definition-flashcard-form.component.scss']
})
export class DefinitionFlashcardFormComponent {
    @Input({ required: true }) formTitle!: string;
    @Input({ required: true }) buttonTemplate!: TemplateRef<Element>;
    @Input({ required: true }) buttonCallback!: () => Promise<void>;
}

