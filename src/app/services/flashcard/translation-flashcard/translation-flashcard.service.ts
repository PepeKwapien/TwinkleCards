import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../modal/modal.service';
import { CollectionRepositoryService } from '../../collection-repository/collection-repository.service';
import { uid } from 'src/app/helpers/uid.helper';
import { ITranslationFlashcard } from 'src/app/models/documents/flashcards/translation-flashcard.interface';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';

interface TranslationFlashcardFormGroupValue {
    frontside: { word: string; sentence?: string };
    backside: { translation: string; translatedSentence?: string };
}

@Injectable({
    providedIn: 'root'
})
export class TranslationFlashcardService {
    private _formGroup: FormGroup;

    public get formGroup(): FormGroup {
        return this._formGroup;
    }

    constructor(
        private _formBuilder: FormBuilder,
        private _modalService: ModalService,
        private _collectionRepository: CollectionRepositoryService
    ) {
        this._formGroup = this._formBuilder.group({
            frontside: this._formBuilder.group({ word: ['', Validators.required], sentence: [''] }),
            backside: this._formBuilder.group({ translation: ['', Validators.required], translatedSentence: [''] })
        });
    }

    public async createFlashcard(collectionId: string): Promise<void> {
        if (!this._formGroup.valid) {
            return;
        }

        const flashcard = this._assembleFlashcard();
        await this._collectionRepository.createFlashcard(collectionId, flashcard);
        this._modalService.close();
    }

    public async updateFlashcard(collectionId: string, flashcard: IBaseFlashcard): Promise<void> {
        if (!this._formGroup.valid) {
            return;
        }

        const editedFlashcard = this._assembleFlashcard(flashcard);
        await this._collectionRepository.updateFlashcard(collectionId, editedFlashcard);
        this._modalService.close();
    }

    private _assembleFlashcard(flashcardBase?: IBaseFlashcard): ITranslationFlashcard {
        const formGroupValue = this._formGroup.value as TranslationFlashcardFormGroupValue;
        const flashcard: ITranslationFlashcard = {
            id: flashcardBase ? flashcardBase.id : uid(),
            createdAt: flashcardBase ? flashcardBase.createdAt : new Date(),
            word: formGroupValue.frontside.word,
            sentence: formGroupValue.frontside.sentence,
            translation: formGroupValue.backside.translation,
            translatedSentence: formGroupValue.backside.translatedSentence
        };

        return flashcard;
    }
}

