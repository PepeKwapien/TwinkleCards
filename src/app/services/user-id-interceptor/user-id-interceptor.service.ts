import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CollectionGroupProperties, UserRepositoryService } from '../user-repository/user-repository.service';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';
import { CollectionInputs } from '../collection-form/collection-form.service';
import { CollectionRepositoryService } from '../collection-repository/collection-repository.service';
import { ICollectionReference } from 'src/app/models/documents/collection-reference.document';

@Injectable({
    providedIn: 'root'
})
export class UserIdInterceptorService {
    private get _userId(): string {
        return this._authService.userId;
    }

    constructor(
        private _authService: AuthService,
        private _userRepository: UserRepositoryService,
        private _collectionRepository: CollectionRepositoryService
    ) {}

    // User repository
    async createCollectionGroup(collectionGroupProperties: CollectionGroupProperties): Promise<void> {
        await this._userRepository.createCollectionGroup(this._userId, collectionGroupProperties);
    }

    async editCollectionGroup(
        collectionGroup: IUserCollectionGroup,
        collectionGroupProperties: CollectionGroupProperties
    ): Promise<void> {
        await this._userRepository.editCollectionGroup(this._userId, collectionGroup, collectionGroupProperties);
    }

    async deleteCollectionGroup(collectionGroup: IUserCollectionGroup): Promise<void> {
        await this._userRepository.deleteCollectionGroup(this._userId, collectionGroup);
    }

    async createCollectionReference(collectionGroupName: string, collectionId: string, collectionName: string) {
        await this._userRepository.createCollectionReference(this._userId, collectionGroupName, collectionId, collectionName);
    }

    async updateCollectionReference(
        newCollectionGroupName: string,
        collectionId: string,
        newCollectionName: string
    ): Promise<void> {
        await this._userRepository.updateCollectionReference(
            this._userId,
            newCollectionGroupName,
            collectionId,
            newCollectionName
        );
    }

    async deleteCollectionReference(collectionGroupName: string, collectionReference: ICollectionReference) {
        await this._userRepository.deleteCollectionReference(this._userId, collectionGroupName, collectionReference);
    }
    // end of UserRepository

    // Collection repository
    async createCollection(collectionInputs: CollectionInputs) {
        return await this._collectionRepository.createCollection(this._userId, collectionInputs);
    }
}

