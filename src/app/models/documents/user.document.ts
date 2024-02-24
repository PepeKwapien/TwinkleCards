import { User } from '@angular/fire/auth';
import { IUserCollectionGroup } from './user-collection-group.document';

export class UserDocument {
    displayName: string | null;
    email: string | null;
    firstLogin: Date;
    lastLogin: Date;
    collectionGroups: IUserCollectionGroup[];

    constructor(displayName: string | null, email: string | null, firstLogin: Date, lastLogin: Date) {
        this.displayName = displayName;
        this.email = email;
        this.firstLogin = firstLogin;
        this.lastLogin = lastLogin;
        this.collectionGroups = [{ name: 'Unassigned', emoji: '🙈', colletions: [] }];
    }

    public static FromFirebaseUser(user: User) {
        return new UserDocument(user.displayName, user.email, new Date(), new Date());
    }
}
