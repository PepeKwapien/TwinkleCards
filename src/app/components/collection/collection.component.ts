import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
        return this._collectionRepository.collection$;
    }

    constructor(private _collectionRepository: CollectionRepositoryService, private _userRepository: UserRepositoryService) {}

    ngOnInit() {
        this._collectionRepository.setupCollectionChangesListener(this.collectionId);
    }

    ngOnDestroy(): void {
        this._collectionRepository.stopCollectionChangesListener();
    }
}

