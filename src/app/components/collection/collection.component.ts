import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, distinctUntilChanged, filter, shareReplay, switchMap, tap } from 'rxjs';
import { CollectionDocument } from 'src/app/models/documents/collection.document';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';
import { UserRepositoryService } from 'src/app/services/user-repository/user-repository.service';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
    @Input() collectionId!: string;

    public get collection$(): Observable<CollectionDocument | undefined> {
        return this._collectionRepository.collection$.pipe(tap((coll) => console.log(coll)));
    }

    // public get ownerUsername$(): Observable<string | null | undefined> {
    //     return this.collection$.pipe(
    //         distinctUntilChanged(),
    //         filter((collection) => collection !== undefined),
    //         switchMap((collection) => this._userRepository.readUsername(collection!.ownerId))
    //     );
    // }

    constructor(private _collectionRepository: CollectionRepositoryService, private _userRepository: UserRepositoryService) {}

    ngOnInit() {
        this._collectionRepository.setupCollectionChangesListener(this.collectionId);
    }

    ngOnDestroy(): void {
        this._collectionRepository.stopCollectionChangesListener();
    }
}

