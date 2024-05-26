import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { determineCollectionTypeBasedOnFlashcard } from 'src/app/helpers/collection-type.helper';
import {
    getFrontsideFlashcardHeader,
    getFrontsideFlashcardBody,
    getBacksideFlashcardHeader,
    getBacksideFlashcardBody
} from 'src/app/helpers/flashcard.helper';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IFlashcardWithFlipState } from 'src/app/models/flashcard-with-flip-state.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { CollectionType } from 'src/app/types/collection-type.type';

@Component({
    selector: 'app-flashcard-preview',
    templateUrl: './flashcard-preview.component.html',
    styleUrls: ['./flashcard-preview.component.scss']
})
export class FlashcardPreviewComponent implements OnInit {
    @Output() flashcardFlipped: EventEmitter<void>;

    @Input({ required: true }) flashcardWithFlipState!: IFlashcardWithFlipState;
    @Input({ required: true }) collectionId!: string;

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

    public get isUserAuthenticated(): boolean {
        return this._authService.isUserAuthenticated;
    }

    constructor(
        private _modalService: ModalService,
        private _collectionRepository: CollectionRepositoryService,
        private _authService: AuthService
    ) {
        this.flashcardFlipped = new EventEmitter();
    }

    ngOnInit(): void {
        this.flashcardType = determineCollectionTypeBasedOnFlashcard(this.flashcardWithFlipState.flashcard);
    }

    public openModal(templateRef: TemplateRef<Element>): void {
        this._modalService.open(templateRef);
    }

    public flip($event: Event): void {
        $event.preventDefault();
        this.flipped = !this.flipped;
        this.flashcardFlipped.next();
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

