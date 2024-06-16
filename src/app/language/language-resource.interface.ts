export interface ILanguareResource {
    // landing page
    get landingPageComponents(): { title: string; description: string; additional?: string[] }[];

    // modal
    get confirmButton(): string;
    get cancelButton(): string;
    get defaultConfirmActionTitle(): string;
    get defaultConfirmActionDescription(): string;
    get saveButton(): string;
    get createButton(): string;
    get irreversibleConfirmation(): string;

    // flashcard form
    get translationFlashcardWord(): string;
    get translationFlashcardSentence(): string;
    get translationFlashcardTranslation(): string;
    get translationFlashcardTranslatedSentence(): string;
    get definitionFlashcardTerm(): string;
    get definitionFlashcardDefinition(): string;
    get createFlashcardFormTitle(): string;
    get editFlashcardFormTitle(): string;

    // collection group
    get newCollectionGroupButton(): string;
    getDeleteGroupTitle(groupName: string): string;
    get deleteCollectionGroupDescription(): string;
    get createCollectionGroupTitle(): string;
    get editCollectionGroupTitle(): string;

    // collection
    getDeleteCollectionTitle(collectionName: string): string;
    get deleteCollectionDescription(): string;
    get createCollectionTitle(): string;
    get editCollectionTitle(): string;
    get emptyCollectionMessage(): string;
    get allMarkedMessage(): string;

    // flashcard
    get deleteFlashcardTitle(): string;
    get deleteFlashcardDescription(): string;

    // auth
    get hi(): string;
    get signin(): string;
    get signout(): string;

    // universal
    get name(): string;
    get color(): string;
    get description(): string;
    get collectionType(): string;
    get exampleUse(): string;
    get translatedUse(): string;
    get group(): string;
    get author(): string;
    get flashcards(): string;
    get show(): string;
    get optional(): string;
}
