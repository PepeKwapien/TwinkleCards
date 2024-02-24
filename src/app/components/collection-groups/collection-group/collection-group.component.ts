import { Component, Input } from '@angular/core';
import { IUserCollectionGroup } from 'src/app/models/documents/user-collection-group.document';

@Component({
    selector: 'app-collection-group',
    templateUrl: './collection-group.component.html',
    styleUrls: ['./collection-group.component.scss']
})
export class CollectionGroupComponent {
    @Input() collectionGroup: IUserCollectionGroup | undefined;

    constructor() {}
}

