import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { determineCollectionTypeBasedOnFlashcard } from 'src/app/helpers/collection-type.helper';
import {
    getFrontsideFlashcardHeader,
    getFrontsideFlashcardBody,
    getBacksideFlashcardHeader,
    getBacksideFlashcardBody
} from 'src/app/helpers/flashcard.helper';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IFlashcardWithFlipState } from 'src/app/types/flashcard-with-flip-state.type';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { CollectionType } from 'src/app/types/collection-type.type';
import { MarkFlashcardsService } from 'src/app/services/mark-flashcards/mark-flashcards.service';

@Component({
    selector: 'app-flashcard-preview',
    templateUrl: './flashcard-preview.component.html',
    styleUrls: ['./flashcard-preview.component.scss']
})
export class FlashcardPreviewComponent implements OnInit {
    @Output() flashcardFlipped: EventEmitter<void>;
    @Output() flashcardMarked: EventEmitter<string>;

    @Input({ required: true }) flashcardWithFlipState!: IFlashcardWithFlipState;
    @Input({ required: true }) collectionId!: string;
    @Input() isUserOwner: boolean = false;

    public get isFlashcardMarked(): boolean {
        return this._markFlashcardsService.isFlashcardMarked(this.flashcardWithFlipState.flashcard.id);
    }

    public flashcardType!: CollectionType;

    public get flipped(): boolean {
        return this.flashcardWithFlipState.flipped;
    }

    public set flipped(value: boolean) {
        this.flashcardWithFlipState.flipped = value;
    }

    public get flashcard(): IBaseFlashcard {
        return this.flashcardWithFlipState.flashcard;
    }

    public get frontsideFlashcardHeader(): string {
        return getFrontsideFlashcardHeader(this.flashcard);
    }

    public get frontsideFlashcardBody(): string {
        return getFrontsideFlashcardBody(this.flashcard);
    }

    public get backsideFlashcardHeader(): string {
        return getBacksideFlashcardHeader(this.flashcard);
    }

    public get backsideFlashcardBody(): string {
        return getBacksideFlashcardBody(this.flashcard);
    }

    constructor(
        private _modalService: ModalService,
        private _collectionRepository: CollectionRepositoryService,
        private _markFlashcardsService: MarkFlashcardsService
    ) {
        this.flashcardFlipped = new EventEmitter();
        this.flashcardMarked = new EventEmitter();
    }

    ngOnInit(): void {
        this.flashcardType = determineCollectionTypeBasedOnFlashcard(this.flashcardWithFlipState.flashcard);
    }

    public openModal(templateRef: TemplateRef<Element>): void {
        this._modalService.open(templateRef);
    }

    public async deleteFlashcard() {
        const result = await this._modalService.getConfirmation({
            title: `Delete this flashcard?`,
            description: 'This action will remove the selected flashcard',
            confirmation: 'This is irreversible. Are you sure?'
        });

        if (result) {
            await this._collectionRepository.deleteFlashcard(this.collectionId, this.flashcard);
        }
    }

    public flip(): void {
        this.flipped = !this.flipped;
        this.flashcardFlipped.next();
    }

    public toggleMark() {
        this.flashcardMarked.next(this.flashcardWithFlipState.flashcard.id);
    }
}
