import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, combineLatest, filter, switchMap } from 'rxjs';
import { CollectionDocument } from 'src/app/models/documents/collection.document';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IDefinitionFlashcard } from 'src/app/models/documents/flashcards/definition-flashcard.interface';
import { ITranslationFlashcard } from 'src/app/models/documents/flashcards/translation-flashcard.interface';
import { IFlashcardWithFlipState } from 'src/app/models/flashcard-with-flip-state.interface';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserRepositoryService } from 'src/app/services/user-repository/user-repository.service';
import { DropdownMenuProperties } from '../dropdown-menu/dropdown-menu.component';
import { CollectionType } from 'src/app/types/collection-type.type';
import { Timestamp } from '@angular/fire/firestore';

export enum CollectionSortOptions {
    alphabeticalAsc = 'Alphabetical Ascending',
    alphabeticalDsc = 'Alphabetical Descending',
    dateAsc = 'Date Ascending',
    dateDsc = 'Date Descending'
}

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, AfterViewInit, OnDestroy {
    // bindToComponentInputs: true
    @Input() collectionId!: string;

    @ViewChild('sortIcon') sortIcon!: TemplateRef<Element>;
    @ViewChild('arrowUpIcon') arrowUpIcon!: TemplateRef<Element>;
    @ViewChild('arrowDownIcon') arrowDownIcon!: TemplateRef<Element>;
    @ViewChild('scheduleUpIcon') scheduleUpIcon!: TemplateRef<Element>;
    @ViewChild('scheduleDownIcon') scheduleDownIcon!: TemplateRef<Element>;

    private _sub: Subscription;

    private _collection: CollectionDocument | undefined;
    private _username: string | null | undefined;
    private _flashcardsWithFlipState: IFlashcardWithFlipState[];
    private _filteredFlashcardsWithFlipState: IFlashcardWithFlipState[];
    private _flipState: boolean;
    private _sortDropdownProperties: DropdownMenuProperties<CollectionSortOptions> = {
        mainButton: '',
        options: [],
        showArrow: false,
        selectBehavior: { initValue: 1 }
    };

    private _collectionFilterValue: string = '';
    private _collectionSortOption: CollectionSortOptions = CollectionSortOptions.dateAsc;

    public get collection(): CollectionDocument | undefined {
        return this._collection;
    }

    public get flashcardsWithFlipState(): IFlashcardWithFlipState[] {
        return this._filteredFlashcardsWithFlipState;
    }

    public get sortDropdownProperties(): DropdownMenuProperties<CollectionSortOptions> {
        return this._sortDropdownProperties;
    }

    public get username() {
        if (this._username === null) {
            return 'Anonymous';
        }
        return this._username;
    }

    constructor(
        private _collectionRepository: CollectionRepositoryService,
        private _userRepository: UserRepositoryService,
        private _modalService: ModalService
    ) {
        this._sub = new Subscription();

        this._flipState = false;
        this._flashcardsWithFlipState = [];
        this._filteredFlashcardsWithFlipState = [];

        const collection$ = this._collectionRepository.collection$.pipe(filter((collection) => collection != undefined));

        const username$ = collection$.pipe(switchMap((col) => this._userRepository.readUsername(col!.ownerId)));

        const subscription = combineLatest([collection$, username$]).subscribe({
            next: (value) => {
                this._collection = value[0];
                this._username = value[1];
                if (this._collection) {
                    this._flashcardsWithFlipState = this._collection.flashcards.map((flashcard) => {
                        const foundMatchingFlashcard = this._flashcardsWithFlipState.find(
                            (lookingFor) => lookingFor.flashcard.id === flashcard.id
                        );
                        const flipped = foundMatchingFlashcard ? foundMatchingFlashcard.flipped : this._flipState;

                        return { flashcard, flipped };
                    });

                    this.sort(this._collectionSortOption);
                    this.filter(this._collectionFilterValue);
                }
            }
        });

        this._sub.add(subscription);
    }

    ngOnInit() {
        this._collectionRepository.setupCollectionChangesListener(this.collectionId);
    }

    ngAfterViewInit(): void {
        this._sortDropdownProperties = {
            ...this._sortDropdownProperties,
            mainButtonTemplate: this.sortIcon,
            options: [
                { display: '', displayTemplate: this.scheduleUpIcon, emitValue: CollectionSortOptions.dateDsc },
                { display: '', displayTemplate: this.scheduleDownIcon, emitValue: CollectionSortOptions.dateAsc },
                { display: 'A-Z', displayTemplate: this.arrowUpIcon, emitValue: CollectionSortOptions.alphabeticalAsc },
                { display: 'A-Z', displayTemplate: this.arrowDownIcon, emitValue: CollectionSortOptions.alphabeticalDsc }
            ]
        };
    }

    ngOnDestroy(): void {
        this._collectionRepository.stopCollectionChangesListener();
        this._sub.unsubscribe();
    }

    public openModal(templateRef: TemplateRef<Element>): void {
        this._modalService.open(templateRef);
    }

    public getFrontsideFlashcardHeader(flashcard: IBaseFlashcard): string {
        if ((flashcard as IDefinitionFlashcard).term) {
            return (flashcard as IDefinitionFlashcard).term;
        } else {
            return (flashcard as ITranslationFlashcard).word;
        }
    }

    public getFronsideFlashcardBody(flashcard: IBaseFlashcard): string {
        if ((flashcard as ITranslationFlashcard).sentence) {
            return (flashcard as ITranslationFlashcard).sentence ?? '';
        } else {
            return '';
        }
    }

    public flip() {
        this._flipState = !this._flipState;
        for (const flashcardWithFlipState of this._flashcardsWithFlipState) {
            flashcardWithFlipState.flipped = this._flipState;
        }
    }

    public correctFlipState() {
        if (!this._flashcardsWithFlipState.some((flashcardWithFlipState) => flashcardWithFlipState.flipped === this._flipState)) {
            this._flipState = !this._flipState;
        }
    }

    public sort(event: CollectionSortOptions) {
        this._collectionSortOption = event;

        switch (event) {
            case CollectionSortOptions.alphabeticalAsc:
                this._flashcardsWithFlipState.sort((a, b) => this._sortByTerm(a, b, false));
                return;
            case CollectionSortOptions.alphabeticalDsc:
                this._flashcardsWithFlipState.sort((a, b) => this._sortByTerm(a, b, true));
                return;
            case CollectionSortOptions.dateAsc:
                this._flashcardsWithFlipState.sort(
                    (a, b) =>
                        (a.flashcard.createdAt as Timestamp).toDate().getTime() -
                        (b.flashcard.createdAt as Timestamp).toDate().getTime()
                );
                return;
            case CollectionSortOptions.dateDsc:
                this._flashcardsWithFlipState.sort(
                    (a, b) =>
                        (b.flashcard.createdAt as Timestamp).toDate().getTime() -
                        (a.flashcard.createdAt as Timestamp).toDate().getTime()
                );
                return;
        }
    }

    public filter(value: string) {
        this._collectionFilterValue = value;

        if (value === '') {
            this._filteredFlashcardsWithFlipState = this._flashcardsWithFlipState;
            return;
        }

        this._filteredFlashcardsWithFlipState = this._flashcardsWithFlipState.filter((flashcard) => {
            let stringifiedContent = '';

            if (this._collection?.type == 'definition') {
                const definitionFlashcard = flashcard.flashcard as IDefinitionFlashcard;
                stringifiedContent += definitionFlashcard.term;
                stringifiedContent += definitionFlashcard.definition;
            } else {
                const translationFlashcard = flashcard.flashcard as ITranslationFlashcard;
                stringifiedContent += translationFlashcard.word;
                stringifiedContent += translationFlashcard.translation;

                if (translationFlashcard.sentence) {
                    stringifiedContent += translationFlashcard.sentence;
                }
                if (translationFlashcard.translatedSentence) {
                    stringifiedContent += translationFlashcard.translatedSentence;
                }
            }

            stringifiedContent = stringifiedContent.toLocaleLowerCase();

            return stringifiedContent.includes(value.toLocaleLowerCase());
        });
    }

    public trackBy(index: number, flashcard: IFlashcardWithFlipState) {
        return `${index}${JSON.stringify(flashcard.flashcard)}`;
    }

    private _sortByTerm(a: IFlashcardWithFlipState, b: IFlashcardWithFlipState, descending: boolean) {
        let result = 0;
        if (this._collection!.type === 'definition') {
            result = (a.flashcard as IDefinitionFlashcard).term.localeCompare((b.flashcard as IDefinitionFlashcard).term);
        } else {
            result = (a.flashcard as ITranslationFlashcard).word.localeCompare((b.flashcard as ITranslationFlashcard).word);
        }

        if (descending) {
            result *= -1;
        }

        return result;
    }
}
