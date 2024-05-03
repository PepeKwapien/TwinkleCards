import { Component, Input, OnInit } from '@angular/core';
import {
    getFrontsideFlashcardHeader,
    getFrontsideFlashcardBody,
    getBacksideFlashcardHeader,
    getBacksideFlashcardBody
} from 'src/app/helpers/flashcard.helper';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-flashcard-display',
    templateUrl: './flashcard-display.component.html',
    styleUrls: ['./flashcard-display.component.scss']
})
export class FlashcardDisplayComponent implements OnInit {
    @Input({ required: true }) flashcards!: IBaseFlashcard[];
    @Input({ required: true, alias: 'flipState' }) initFlipState!: boolean;

    private _index = 0;
    private _flipped = false;

    public get flipped(): boolean {
        return this._flipped;
    }

    public get isTherePrevious(): boolean {
        return this._index !== 0;
    }

    public get isThereNext(): boolean {
        return this._index !== this.flashcards.length - 1;
    }

    public get frontsideFlashcardHeader(): string {
        return getFrontsideFlashcardHeader(this.flashcards[this._index]);
    }

    public get frontsideFlashcardBody(): string {
        return getFrontsideFlashcardBody(this.flashcards[this._index]);
    }

    public get backsideFlashcardHeader(): string {
        return getBacksideFlashcardHeader(this.flashcards[this._index]);
    }

    public get backsideFlashcardBody(): string {
        return getBacksideFlashcardBody(this.flashcards[this._index]);
    }

    constructor(private _modalService: ModalService) {}

    ngOnInit(): void {
        let currentIndex = this.flashcards.length;
        this._flipped = this.initFlipState;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.flashcards[currentIndex], this.flashcards[randomIndex]] = [
                this.flashcards[randomIndex],
                this.flashcards[currentIndex]
            ];
        }
    }

    public close(): void {
        this._modalService.close();
    }

    public flip(): void {
        this._flipped = !this._flipped;
    }

    public previous(): void {
        if (this.isTherePrevious) {
            this._flipped = this.initFlipState;
            setTimeout(() => {
                this._index--;
            }, 300);
        }
    }

    public next(): void {
        if (this.isThereNext) {
            this._flipped = this.initFlipState;
            setTimeout(() => {
                this._index++;
            }, 300);
        }
    }
}

