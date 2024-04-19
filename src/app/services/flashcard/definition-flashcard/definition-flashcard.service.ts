import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../modal/modal.service';
import { CollectionRepositoryService } from '../../collection-repository/collection-repository.service';
import { uid } from 'src/app/helpers/uid.helper';
import { IDefinitionFlashcard } from 'src/app/models/documents/flashcards/definition-flashcard.interface';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';

interface DefinitionFlashcardFormGroupValue {
    frontside: { term: string };
    backside: { definition: string };
}

@Injectable()
export class DefinitionFlashcardService {
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
            frontside: this._formBuilder.group({ term: ['', Validators.required] }),
            backside: this._formBuilder.group({ definition: ['', Validators.required] })
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

    private _assembleFlashcard(flashcardBase?: IBaseFlashcard): IDefinitionFlashcard {
        const formGroupValue = this._formGroup.value as DefinitionFlashcardFormGroupValue;
        const flashcard: IDefinitionFlashcard = {
            id: flashcardBase ? flashcardBase.id : uid(),
            createdAt: flashcardBase ? flashcardBase.createdAt : new Date(),
            term: formGroupValue.frontside.term,
            definition: formGroupValue.backside.definition
        };

        return flashcard;
    }
}

