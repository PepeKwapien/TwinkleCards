import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { determineCollectionTypeBasedOnFlashcard } from 'src/app/helpers/collection-type.helper';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IDefinitionFlashcard } from 'src/app/models/documents/flashcards/definition-flashcard.interface';
import { ITranslationFlashcard } from 'src/app/models/documents/flashcards/translation-flashcard.interface';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { CollectionType } from 'src/app/types/collection-type.type';

@Component({
    selector: 'app-flashcard-preview',
    templateUrl: './flashcard-preview.component.html',
    styleUrls: ['./flashcard-preview.component.scss']
})
export class FlashcardPreviewComponent implements OnInit {
    @Input({ required: true }) flashcard!: IBaseFlashcard;
    @Input({ required: true }) collectionId!: string;

    public flashcardType!: CollectionType;

    public get flipped(): boolean {
        return this._flipped;
    }

    private _flipped: boolean = false;

    constructor(private _modalService: ModalService, private _collectionRepository: CollectionRepositoryService) {}

    ngOnInit(): void {
        this.flashcardType = determineCollectionTypeBasedOnFlashcard(this.flashcard);
    }

    public getFrontsideFlashcardHeader(): string {
        if ((this.flashcard as IDefinitionFlashcard).term) {
            return (this.flashcard as IDefinitionFlashcard).term;
        } else {
            return (this.flashcard as ITranslationFlashcard).word;
        }
    }

    public getFrontsideFlashcardBody(): string {
        if ((this.flashcard as ITranslationFlashcard).sentence) {
            return (this.flashcard as ITranslationFlashcard).sentence ?? '';
        } else {
            return '';
        }
    }

    public getBacksideFlashcardHeader(): string {
        if ((this.flashcard as ITranslationFlashcard).translation) {
            return (this.flashcard as ITranslationFlashcard).translation;
        } else {
            return '';
        }
    }

    public getBacksideFlashcardBody(): string {
        if ((this.flashcard as ITranslationFlashcard).translatedSentence) {
            return (this.flashcard as ITranslationFlashcard).translatedSentence ?? '';
        } else {
            return (this.flashcard as IDefinitionFlashcard).definition;
        }
    }

    public openModal(templateRef: TemplateRef<Element>): void {
        this._modalService.open(templateRef);
    }

    public flip($event: Event): void {
        $event.preventDefault();
        this._flipped = !this._flipped;
    }

    public async deleteFlashcard($event: Event) {
        $event.preventDefault();

        const result = await this._modalService.getConfirmation({
            title: `Delete this flashcard?`,
            description: 'This action will remove the selected flashcard',
            confirmation: 'This is irreversible. Are you sure?'
        });

        if (result) {
            await this._collectionRepository.deleteFlashcard(this.collectionId, this.flashcard);
        }
    }
}

