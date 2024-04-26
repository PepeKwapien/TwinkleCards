import { Timestamp } from '@angular/fire/firestore';

export interface IBaseFlashcard {
    id: string;
    createdAt: Date | Timestamp;
}
