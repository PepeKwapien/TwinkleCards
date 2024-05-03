import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import {
    getFrontsideFlashcardHeader,
    getFrontsideFlashcardBody,
    getBacksideFlashcardHeader,
    getBacksideFlashcardBody
} from 'src/app/helpers/flashcard.helper';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IFlashcardWithFlipState } from 'src/app/models/flashcard-with-flip-state.interface';
import { ModalService } from 'src/app/services/modal/modal.service';

const left = [
    query(':enter', style({ position: 'absolute' })),

    group([
        query(':enter', [
            style({ transform: 'translateX(-100vw)', opacity: 0 }),
            animate('0.5s ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ]),
        query(':leave', [
            style({ transform: 'translateX(0%)', opacity: 1 }),
            animate('0.5s ease-out', style({ transform: 'translateX(100vw)', opacity: 0 }))
        ])
    ])
];

const right = [
    query(':enter', style({ position: 'absolute' })),
    group([
        query(':enter', [
            style({ transform: 'translateX(100vw)', opacity: 0 }),
            animate('0.5s ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
        ]),
        query(':leave', [
            style({ transform: 'translateX(0%)', opacity: 1 }),
            animate('0.5s ease-out', style({ transform: 'translateX(-100vw)', opacity: 0 }))
        ])
    ])
];

@Component({
    selector: 'app-flashcard-display',
    templateUrl: './flashcard-display.component.html',
    styleUrls: ['./flashcard-display.component.scss'],
    animations: [trigger('slide', [transition(':increment', right), transition(':decrement', left)])]
})
export class FlashcardDisplayComponent implements OnInit {
    @Input({ required: true }) flashcards!: IFlashcardWithFlipState[];
    @Input({ required: true, alias: 'flipState' }) initFlipState!: boolean;

    private _index = 0;

    public get isTherePrevious(): boolean {
        return this._index !== 0;
    }

    public get isThereNext(): boolean {
        return this._index !== this.flashcards.length - 1;
    }

    public get index(): number {
        return this._index;
    }

    constructor(private _modalService: ModalService) {}

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

    public getFrontsideFlashcardHeader(flashcard: IBaseFlashcard): string {
        return getFrontsideFlashcardHeader(flashcard);
    }

    public getFrontsideFlashcardBody(flashcard: IBaseFlashcard): string {
        return getFrontsideFlashcardBody(flashcard);
    }

    public getBacksideFlashcardHeader(flashcard: IBaseFlashcard): string {
        return getBacksideFlashcardHeader(flashcard);
    }

    public getBacksideFlashcardBody(flashcard: IBaseFlashcard): string {
        return getBacksideFlashcardBody(flashcard);
    }

    public close(): void {
        this._modalService.close();
    }

    public flip(flashcardWithFlipState: IFlashcardWithFlipState): void {
        flashcardWithFlipState.flipped = !flashcardWithFlipState.flipped;
    }

    public previous(): void {
        if (this.isTherePrevious) {
            this._index--;
        }
    }

    public next(): void {
        if (this.isThereNext) {
            this._index++;
        }
    }
}

