import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionDocument } from 'src/app/models/documents/collection.document';
import { CollectionRepositoryService } from 'src/app/services/collection-repository/collection-repository.service';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
    @Input() collectionId!: string;

    public get collection$(): Observable<CollectionDocument | undefined> {
        return this._collectionRepository.collection$;
    }

    constructor(private _collectionRepository: CollectionRepositoryService) {}

    ngOnInit() {
        this._collectionRepository.setupCollectionChanges(this.collectionId);
    }
}

