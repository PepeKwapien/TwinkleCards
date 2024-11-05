import { ILanguareResource } from './language-resource.interface';

export class English implements ILanguareResource {
    get unnassignedGroupName(): string {
        return 'Unassigned 🙈';
    }
    get loadMoreText(): string {
        return 'Load more';
    }
    get optional(): string {
        return 'Optional';
    }

    get hi(): string {
        return 'Hi';
    }

    get signin(): string {
        return 'Sign in';
    }

    get signout(): string {
        return 'Sign out';
    }

    get deleteFlashcardDescription(): string {
        return 'This action will remove the selected flashcard';
    }

    get deleteFlashcardTitle(): string {
        return 'Delete this flashcard?';
    }

    get emptyCollectionMessage(): string {
        return 'This collection is empty';
    }

    get allMarkedMessage(): string {
        return "You're doing great!";
    }

    get show(): string {
        return 'Show';
    }

    get author(): string {
        return 'Author';
    }

    get flashcards(): string {
        return 'Flashcards';
    }

    get createCollectionTitle(): string {
        return 'New collection';
    }

    get editCollectionTitle(): string {
        return 'Edit collection';
    }

    get group(): string {
        return 'Group';
    }

    get exampleUse(): string {
        return 'Example use';
    }

    get translatedUse(): string {
        return 'Translated use';
    }

    get collectionType(): string {
        return 'Collection type';
    }

    get description(): string {
        return 'Description';
    }

    get editCollectionGroupTitle(): string {
        return 'Edit collection group';
    }

    get createCollectionGroupTitle(): string {
        return 'New collection group';
    }

    get color(): string {
        return 'Color';
    }

    get name(): string {
        return 'Name';
    }

    getDeleteGroupTitle(groupName: string): string {
        return `Delete group '${groupName}'?`;
    }

    getDeleteCollectionTitle(collectionName: string): string {
        return `Delete collection ${collectionName}?`;
    }

    get deleteCollectionGroupDescription(): string {
        return 'This action will remove the group and all of the collections inside it';
    }

    get deleteCollectionDescription(): string {
        return 'This action will remove the collection and all of the flashcards inside it';
    }

    get irreversibleConfirmation(): string {
        return 'This is irreversible. Are you sure?';
    }

    get newCollectionGroupButton(): string {
        return 'New collection group';
    }

    get createFlashcardFormTitle(): string {
        return 'New flashcard';
    }

    get editFlashcardFormTitle(): string {
        return 'Edit flashcard';
    }

    get definitionFlashcardTerm(): string {
        return 'Term';
    }

    get definitionFlashcardDefinition(): string {
        return 'Definition';
    }

    get createButton(): string {
        return 'Create';
    }

    get saveButton(): string {
        return 'Save';
    }

    get translationFlashcardWord(): string {
        return 'Word';
    }

    get translationFlashcardSentence(): string {
        return 'Example sentence';
    }

    get translationFlashcardTranslation(): string {
        return 'Translation';
    }

    get translationFlashcardTranslatedSentence(): string {
        return 'Translated sentence';
    }

    get defaultConfirmActionTitle(): string {
        return 'Irreversible action';
    }

    get defaultConfirmActionDescription(): string {
        return 'Are you sure?';
    }
    get confirmButton(): string {
        return 'Yes';
    }

    get cancelButton(): string {
        return 'Cancel';
    }

    get landingPageComponents(): { title: string; description: string; additional?: string[] | undefined }[] {
        return [
            {
                title: 'One place for all your flashcards 🗃️',
                description:
                    'TwinkleCards✨ is an app from a flashcard lover for other flashcard lovers. The goal is to make the process of studying with flashcard easier and more convenient',
                additional: ['Create your flashcards 👏', 'Manage them with ease 🙌', 'Have fun while studying 🥳']
            },
            {
                title: 'Study and memorize easier 💡',
                description:
                    'TwinkleCards✨ is here to make your learning process easier. No more searching through hundreds of your flashcards to find that one word that you have on the tip of your tongue...',
                additional: ['Search for words 🔍', 'Sort your collections 🗂️', 'View and flip flashcards 🍳']
            },
            {
                title: 'Share with your friends 🤝',
                description:
                    'Maybe there is that one special friend that will share their collections with you. You can share your TwinkleCards✨ collection by copying the link. Authentication is not required',
                // additional: ['Browse collections of others 🧐', 'Make collections public 📡', '...or keep them hidden 🙈'],
                additional: ['Browse collections of friends 🧐', 'Share your collections 📡', '...or keep them hidden 🙈']
            }
        ];
    }
}
