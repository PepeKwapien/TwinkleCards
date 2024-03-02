import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CollectionGroupProperties, UserRepositoryService } from '../user-repository/user-repository.service';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionGroupColorType } from 'src/app/helpers/colors.helper';

@Injectable({
    providedIn: 'root'
})
export class UserIdInterceptorService {
    constructor(private _authService: AuthService, private _userRepositoryService: UserRepositoryService) {}

    async createCollectionGroup(collectionGroupProperties: CollectionGroupProperties): Promise<void> {
        await this._userRepositoryService.createCollectionGroup(this._authService.userId, collectionGroupProperties);
    }

    async editCollectionGroup(
        collectionGroup: IUserCollectionGroup,
        collectionGroupProperties: CollectionGroupProperties
    ): Promise<void> {
        await this._userRepositoryService.editCollectionGroup(
            this._authService.userId,
            collectionGroup,
            collectionGroupProperties
        );
    }

    async deleteCollectionGroup(collectionGroup: IUserCollectionGroup): Promise<void> {
        await this._userRepositoryService.deleteCollectionGroup(this._authService.userId, collectionGroup);
    }
}

