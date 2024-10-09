import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription, combineLatest, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { CollectionDocument } from 'src/app/models/documents/collection.document';
import { IBaseFlashcard } from 'src/app/models/documents/flashcards/base-flashcard.interface';
import { IDefinitionFlashcard } from 'src/app/models/documents/flashcards/definition-flashcard.interface';
import { ITranslationFlashcard } from 'src/app/models/documents/flashcards/translation-flashcard.interface';
import { IFlashcardWithFlipState } from 'src/app/types/flashcard-with-flip-state.type';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserRepositoryService } from 'src/app/services/user-repository/user-repository.service';
import { DropdownMenuProperties } from '../dropdown-menu/dropdown-menu.component';
import { Timestamp } from '@angular/fire/firestore';
import { IModalProperties } from 'src/app/types/modal-properties.type';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MarkFlashcardsService } from 'src/app/services/mark-flashcards/mark-flashcards.service';
import { LanguageService } from 'src/app/services/language/language.service';

enum CollectionSortOptions {
    alphabeticalAsc = 'Alphabetical Ascending',
    alphabeticalDsc = 'Alphabetical Descending',
    dateAsc = 'Date Ascending',
    dateDsc = 'Date Descending'
}

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    providers: [MarkFlashcardsService]
})
export class CollectionComponent implements OnInit, AfterViewInit, OnDestroy {
    // bindToComponentInputs: true
    @Input() collectionId!: string;

    @ViewChild('sortIcon') sortIcon!: TemplateRef<Element>;
    @ViewChild('arrowUpIcon') arrowUpIcon!: TemplateRef<Element>;
    @ViewChild('arrowDownIcon') arrowDownIcon!: TemplateRef<Element>;
    @ViewChild('scheduleUpIcon') scheduleUpIcon!: TemplateRef<Element>;
    @ViewChild('scheduleDownIcon') scheduleDownIcon!: TemplateRef<Element>;

    public showMarked: boolean = false;
    public limit: number = 52;

    private _sub: Subscription;

    private _collection: CollectionDocument | undefined;
    private _username: string | null | undefined;
    private _flashcardsWithFlipState: IFlashcardWithFlipState[];
    private _flashcardsWithFlipStateCopy: IFlashcardWithFlipState[];
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
        if (!this.showMarked && this.isUserOwner) {
            return this._filteredFlashcardsWithFlipState.filter(
                (flashcardWithFlipState) => !this.isFlashcardMarked(flashcardWithFlipState.flashcard.id)
            );
        }

        return this._filteredFlashcardsWithFlipState;
    }

    public get newFlashcardsWithFlipState(): IFlashcardWithFlipState[] {
        return this._flashcardsWithFlipStateCopy;
    }

    public get flipState(): boolean {
        return this._flipState;
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

    public get isUserOwner(): boolean {
        return this._authService.isUserAuthenticated && this._authService.userId === this.collection?.ownerId;
    }

    public get areAllFlashcardsMarked(): boolean {
        let answer = false;

        const filteredOutMarked = this._flashcardsWithFlipState.filter(
            (flashcardWithFlipState) => !this.isFlashcardMarked(flashcardWithFlipState.flashcard.id)
        );

        if (filteredOutMarked.length === 0) {
            answer = true;
        }

        return answer;
    }

    public get authorText() {
        return this._languageService.languageResouce.author;
    }

    public get flashcardsText() {
        return this._languageService.languageResouce.flashcards;
    }

    public get showText() {
        return this._languageService.languageResouce.show;
    }

    public get emptyCollectionMessage() {
        return this._languageService.languageResouce.emptyCollectionMessage;
    }

    public get allMarkedMessage() {
        return this._languageService.languageResouce.allMarkedMessage;
    }

    public get loadMoreText() {
        return this._languageService.languageResouce.loadMoreText;
    }

    constructor(
        private _collectionRepository: CollectionRepositoryService,
        private _userRepository: UserRepositoryService,
        private _modalService: ModalService,
        private _authService: AuthService,
        private _markFlashcardService: MarkFlashcardsService,
        private _languageService: LanguageService
    ) {
        this._sub = new Subscription();

        this._flipState = false;
        this._flashcardsWithFlipState = [];
        // It's so that play collection does not randomize actual collection on screen
        this._flashcardsWithFlipStateCopy = [];
        this._filteredFlashcardsWithFlipState = [];

        const collection$ = this._collectionRepository.collection$.pipe(filter((collection) => collection != undefined));

        const username$ = collection$.pipe(switchMap((col) => this._userRepository.readUsername(col!.ownerId)));

        const subscription = combineLatest([collection$, username$])
            .pipe(distinctUntilChanged((previous, current) => JSON.stringify(previous) === JSON.stringify(current)))
            .subscribe({
                next: (value) => {
                    this._collection = value[0];
                    this._username = value[1];
                    if (this._collection) {
                        const mapFlippedStateFromExistingArray = (flashcard: IBaseFlashcard) => {
                            const foundMatchingFlashcard = this._flashcardsWithFlipState.find(
                                (lookingFor) => lookingFor.flashcard.id === flashcard.id
                            );
                            const flipped = foundMatchingFlashcard ? foundMatchingFlashcard.flipped : this._flipState;

                            return { flashcard, flipped };
                        };

                        this._flashcardsWithFlipState = this._collection.flashcards.map(mapFlippedStateFromExistingArray);

                        this._markFlashcardService.markedFlashcards = this._collection.markedFlashcards;

                        this.sort(this._collectionSortOption);
                        this.filter(this._collectionFilterValue);
                    }
                }
            });

        this._sub.add(subscription);
    }

    ngOnInit() {
        this._collectionRepository.setupCollectionChangesListener(this.collectionId);
        this._markFlashcardService.collectionId = this.collectionId;
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

    public playCollection(templateRef: TemplateRef<Element>): void {
        this._flashcardsWithFlipStateCopy = this._flashcardsWithFlipState.map((flashcardWithFlipState) => {
            return { ...flashcardWithFlipState, flipped: this._flipState };
        });

        if (!this.showMarked && this.isUserOwner) {
            this._flashcardsWithFlipStateCopy = this._flashcardsWithFlipStateCopy.filter(
                (flashcardWithFlipState) => !this.isFlashcardMarked(flashcardWithFlipState.flashcard.id)
            );
        }

        this._modalService.open(templateRef, { showClose: false, transparentBackground: false });
    }

    public openModal(templateRef: TemplateRef<Element>, modalProperties?: IModalProperties): void {
        if (modalProperties) {
            this._modalService.open(templateRef, modalProperties);
        } else {
            this._modalService.open(templateRef);
        }
    }

    public flip() {
        this._flipState = !this._flipState;
        for (let i = 0; i < this._flashcardsWithFlipState.length; i++) {
            this._flashcardsWithFlipState[i].flipped = this._flipState;
        }
    }

    public correctFlipState() {
        if (!this._flashcardsWithFlipState.some((flashcardWithFlipState) => flashcardWithFlipState.flipped === this._flipState)) {
            this._flipState = !this._flipState;
        }
    }

    public isFlashcardMarked(flashcardId: string): boolean {
        return this._markFlashcardService.isFlashcardMarked(flashcardId);
    }

    public async toggleFlashcardMark(flashcardId: string) {
        await this._markFlashcardService.toggleFlashcardMark(flashcardId);
    }

    public sort(event: CollectionSortOptions): void {
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

    public filter(value: string): void {
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
        return `${flashcard.flashcard.id}`;
    }

    public getFlashcardDelay(index: number): number {
        const delayByIndex = 0.1 * (index % 52);

        return Math.min(delayByIndex, 2);
    }

    public increaseLimit() {
        this.limit += 52;
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
