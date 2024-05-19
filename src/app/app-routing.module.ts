import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionsSearchComponent } from './components/collections-search/collections-search.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
    { path: ':collectionId', component: CollectionComponent },
    { path: 'search/:term', component: CollectionsSearchComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
