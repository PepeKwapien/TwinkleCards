import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserRepositoryService } from '../user-repository/user-repository.service';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';

@Injectable({
    providedIn: 'root'
})
export class UserIdInterceptorService {
    constructor(private _authService: AuthService, private _userRepositoryService: UserRepositoryService) {}

    async createCollectionGroup(collectionGroupProperties: { name: string; color: string }): Promise<void> {
        await this._userRepositoryService.createCollectionGroup(this._authService.userId, collectionGroupProperties);
    }

    async deleteCollectionGroup(collectionGroup: IUserCollectionGroup): Promise<void> {
        await this._userRepositoryService.deleteCollectionGroup(this._authService.userId, collectionGroup);
    }
}

