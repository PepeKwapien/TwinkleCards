import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest, filter, shareReplay, switchMap, tap } from 'rxjs';
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

    private _sub: Subscription;

    private _collection: CollectionDocument | undefined;
    private _username: string | null | undefined;

    public get collection() {
        return this._collection;
    }

    public get username() {
        if (this._username === null) {
            return 'Anonymous';
        }
        return this._username;
    }

    constructor(private _collectionRepository: CollectionRepositoryService, private _userRepository: UserRepositoryService) {
        this._sub = new Subscription();

        const collection$ = this._collectionRepository.collection$.pipe(filter((collection) => collection != undefined));

        const username$ = collection$.pipe(switchMap((col) => this._userRepository.readUsername(col!.ownerId)));

        const subscription = combineLatest([collection$, username$]).subscribe({
            next: (value) => {
                this._collection = value[0];
                this._username = value[1];
            }
        });

        this._sub.add(subscription);
    }

    ngOnInit() {
        this._collectionRepository.setupCollectionChangesListener(this.collectionId);
    }

    ngOnDestroy(): void {
        this._collectionRepository.stopCollectionChangesListener();
        this._sub.unsubscribe();
    }
}
