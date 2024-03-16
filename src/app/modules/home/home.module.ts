import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollectionGroupsComponent } from 'src/app/components/collection-groups/collection-groups.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CollectionGroupComponent } from 'src/app/components/collection-groups/collection-group/collection-group.component';
import { CollectionFormBodyComponent } from 'src/app/components/collection-form/collection-form-body/collection-form-body.component';
import { CreateCollectionFormComponent } from 'src/app/components/collection-form/create-collection-form/create-collection-form.component';
import { CollectionGroupFormBodyComponent } from 'src/app/components/collection-group-form/collection-group-form-body/collection-group-form-body.component';
import { CreateCollectionGroupFormComponent } from 'src/app/components/collection-group-form/create-collection-group-form/create-collection-group-form.component';
import { EditCollectionGroupFormComponent } from 'src/app/components/collection-group-form/edit-collection-group-form/edit-collection-group-form.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
    declarations: [
        CollectionGroupsComponent,
        CollectionGroupComponent,
        CollectionGroupFormBodyComponent,
        CreateCollectionGroupFormComponent,
        EditCollectionGroupFormComponent,
        CollectionFormBodyComponent,
        CreateCollectionFormComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: CollectionGroupsComponent }]),
        ReactiveFormsModule,
        LoadingModule
    ]
})
export class HomeModule {}

