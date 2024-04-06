import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../modal/modal.service';
import { CollectionRepositoryService } from '../../collection-repository/collection-repository.service';
import { uid } from 'src/app/helpers/uid.helper';
import { IDefinitionFlashcard } from 'src/app/models/documents/flashcards/definition-flashcard.interface';

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

    public async createFlashcard(collectionId: string) {
        if (!this._formGroup.valid) {
            return;
        }

        const formGroupValue = this._formGroup.value as DefinitionFlashcardFormGroupValue;
        const flashcard: IDefinitionFlashcard = {
            id: uid(),
            term: formGroupValue.frontside.term,
            definition: formGroupValue.backside.definition
        };
        await this._collectionRepository.createFlashcard(collectionId, flashcard);
        this._modalService.close();
    }
}

