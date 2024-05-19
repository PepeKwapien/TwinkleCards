import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-collections-search',
    templateUrl: './collections-search.component.html',
    styleUrls: ['./collections-search.component.scss']
})
export class CollectionsSearchComponent {
    @Input() term: string | undefined;
}

