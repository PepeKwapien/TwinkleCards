import { Injectable } from '@angular/core';
import { CollectionRepositoryService } from '../collection-repository/collection-repository.service';

@Injectable({
    providedIn: 'root'
})
export class MarkFlashcardsService {
    private _markedFlashcards: string[];
    private _collectionId: string;

    public set markedFlashcards(value: string[] | undefined) {
        if (value) {
            this._markedFlashcards = value;
        }
    }

    public set collectionId(value: string) {
        this._collectionId = value;
    }

    constructor(private _collectionRepository: CollectionRepositoryService) {
        this._markedFlashcards = [];
        this._collectionId = '';
    }

    public isFlashcardMarked(flashcardId: string): boolean {
        return !!this._markedFlashcards.includes(flashcardId);
    }

    public async toggleFlashcardMark(flashcardId: string) {
        if (this.isFlashcardMarked(flashcardId)) {
            await this._collectionRepository.unmarkFlashcard(this._collectionId, flashcardId);
        } else {
            await this._collectionRepository.markFlashcard(this._collectionId, flashcardId);
        }
    }

    public async clearAllMarked() {
        await this._collectionRepository.clearAllMarked(this._collectionId);
    }
}

