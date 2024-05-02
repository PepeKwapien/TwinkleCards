import { Component, Input, OnInit } from '@angular/core';
import {
    getFrontsideFlashcardHeader,
    getFrontsideFlashcardBody,
    getBacksideFlashcardHeader,
    getBacksideFlashcardBody
} from 'src/app/helpers/flashcard.helper';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';

@Component({
    selector: 'app-flashcard-display',
    templateUrl: './flashcard-display.component.html',
    styleUrls: ['./flashcard-display.component.scss']
})
export class FlashcardDisplayComponent implements OnInit {
    @Input({ required: true }) flashcards!: IBaseFlashcard[];

    private _index = 0;
    private _flipped = false;

    public get flipped(): boolean {
        return this._flipped;
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

    ngOnInit(): void {
        let currentIndex = this.flashcards.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.flashcards[currentIndex], this.flashcards[randomIndex]] = [
                this.flashcards[randomIndex],
                this.flashcards[currentIndex]
            ];
        }
    }

    public flip(): void {
        this._flipped = !this._flipped;
    }
}

