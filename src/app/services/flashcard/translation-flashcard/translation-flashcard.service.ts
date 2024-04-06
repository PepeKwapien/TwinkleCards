import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../modal/modal.service';
import { CollectionRepositoryService } from '../../collection-repository/collection-repository.service';
import { uid } from 'src/app/helpers/uid.helper';
import { ITranslationFlashcard } from 'src/app/models/documents/flashcards/translation-flashcard.interface';

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

    public async createFlashcard(collectionId: string) {
        if (!this._formGroup.valid) {
            return;
        }

        const formGroupValue = this._formGroup.value as TranslationFlashcardFormGroupValue;
        const flashcard: ITranslationFlashcard = {
            id: uid(),
            word: formGroupValue.frontside.word,
            sentence: formGroupValue.frontside.sentence,
            translation: formGroupValue.backside.translation,
            translatedSentence: formGroupValue.backside.translatedSentence
        };
        await this._collectionRepository.createFlashcard(collectionId, flashcard);
        this._modalService.close();
    }
}

