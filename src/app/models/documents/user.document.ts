import { User } from '@angular/fire/auth';
import { IUserCollectionGroup } from './user-collection-group.document';

export class UserDocument {
    displayName: string | null;
    email: string | null;
    photo: string | null;
    firstLogin: Date;
    lastLogin: Date;
    collectionGroups: IUserCollectionGroup[];

    constructor(displayName: string | null, email: string | null, photo: string | null, firstLogin: Date, lastLogin: Date) {
        this.displayName = displayName;
        this.email = email;
        this.photo = photo;
        this.firstLogin = firstLogin;
        this.lastLogin = lastLogin;
        this.collectionGroups = [{ name: 'Unassigned 🙈', color: 'pink', collections: [] }];
    }

    public static FromFirebaseUser(user: User) {
        return new UserDocument(user.displayName, user.email, user.photoURL, new Date(), new Date());
    }
}
