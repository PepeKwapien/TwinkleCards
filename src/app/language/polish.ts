import { ILanguareResource } from './language-resource.interface';

export class Polish implements ILanguareResource {
    get landingPageComponents(): { title: string; description: string; additional?: string[] | undefined }[] {
        return [
            {
                title: 'Jedno miejsce dla wszystkich Twoich fiszek 🗃️',
                description:
                    'TwinkleCards✨ to aplikacja dla entuzjastów fiszek od entuzjasty fiszek. Celem aplikacji jest sprawienie, by nauka fiszkami była przyjemniejsza i wygodniejsza',
                additional: ['Twórz swoje fiszki 👏', 'Zarządzaj nimi z łatwością 🙌', 'Baw się ucząc 🥳']
            },
            {
                title: 'Ucz się i zapamiętuj łatwiej 💡',
                description:
                    'TwinkleCards✨ spieszy z pomocą, by ułatwić Twój proces nauki. Zapomnij o przeszukiwaniu swojego obszernego zbioru fiszek, by znaleźć to jedno słówko, które masz na końcu języka...',
                additional: ['Przeszukuj słówka 🔍', 'Sortuj kolekcje 🗂️', 'Przeglądaj i przewracaj fiszki 🍳']
            },
            {
                title: 'Dziel się ze znajomymi 🤝',
                description:
                    'Może masz tego jednego przyjaciela, który udostępni ci swoją kolekcję. TwinkleCards✨ pozwala ci na wysyłanie Twoich kolekcji innym. Uwierzytelnienie nie jest wymagane',
                // additional: ['Browse collections of others 🧐', 'Make collections public 📡', '...or keep them hidden 🙈'],
                additional: ['Przeglądaj kolekcje znajomych 🧐', 'Udostępniaj kolekcje 📡', '...lub zachowaj je dla siebie 🙈']
            }
        ];
    }

    get confirmButton(): string {
        return 'Tak';
    }

    get cancelButton(): string {
        return 'Anuluj';
    }

    get defaultConfirmActionTitle(): string {
        return 'Nieodwracalna akcja';
    }

    get defaultConfirmActionDescription(): string {
        return 'Jesteś pewien/pewna?';
    }

    get saveButton(): string {
        return 'Zapisz';
    }

    get createButton(): string {
        return 'Stwórz';
    }

    get irreversibleConfirmation(): string {
        return 'Akcja jest nieodwracalna';
    }

    get translationFlashcardWord(): string {
        return 'Słowo';
    }

    get translationFlashcardSentence(): string {
        return 'Przykładowe zdanie';
    }

    get translationFlashcardTranslation(): string {
        return 'Tłumaczenie';
    }

    get translationFlashcardTranslatedSentence(): string {
        return 'Przetłumaczone zdanie';
    }

    get definitionFlashcardTerm(): string {
        return 'Termin';
    }

    get definitionFlashcardDefinition(): string {
        return 'Definicja';
    }

    get createFlashcardFormTitle(): string {
        return 'Nowa fiszka';
    }

    get editFlashcardFormTitle(): string {
        return 'Edytuj fiszkę';
    }

    get newCollectionGroupButton(): string {
        return 'Nowa grupa kolekcji';
    }

    getDeleteGroupTitle(groupName: string): string {
        return `Usunąć grupę ${groupName}?`;
    }

    get deleteCollectionGroupDescription(): string {
        return 'Ta akcja usunie wybraną grupę i wszystkie jej kolekcje';
    }

    get createCollectionGroupTitle(): string {
        return 'Nowa grupa kolekcji';
    }

    get editCollectionGroupTitle(): string {
        return 'Edytuj grupę kolekcji';
    }

    getDeleteCollectionTitle(collectionName: string): string {
        return `Usunąć kolekcję ${collectionName}?`;
    }

    get deleteCollectionDescription(): string {
        return 'Ta akcja usunie wybraną kolekcję i wszystkie jej fiszki';
    }

    get createCollectionTitle(): string {
        return 'Nowa kolekcja';
    }

    get editCollectionTitle(): string {
        return 'Edytuj kolekcję';
    }

    get emptyCollectionMessage(): string {
        return 'Kolekcja jest pusta';
    }

    get allMarkedMessage(): string {
        return 'Świetnie Ci idzie!';
    }

    get deleteFlashcardTitle(): string {
        return 'Usunąć tą fiszkę?';
    }

    get deleteFlashcardDescription(): string {
        return 'Ta akcja usunie wybraną fiszkę';
    }

    get hi(): string {
        return 'Hej';
    }

    get signin(): string {
        return 'Zaloguj';
    }

    get signout(): string {
        return 'Wyloguj';
    }

    get name(): string {
        return 'Nazwa';
    }

    get color(): string {
        return 'Kolor';
    }

    get description(): string {
        return 'Opis';
    }

    get collectionType(): string {
        return 'Typ kolekcji';
    }

    get exampleUse(): string {
        return 'Użycie';
    }

    get translatedUse(): string {
        return 'Użycie';
    }

    get group(): string {
        return 'Grupa';
    }

    get author(): string {
        return 'Autor';
    }

    get flashcards(): string {
        return 'Fiszki';
    }

    get show(): string {
        return 'Pokaż';
    }
}
