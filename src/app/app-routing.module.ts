import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
    {
        path: ':collectionId',
        loadChildren: () => import('./modules/collection/collection.module').then((m) => m.CollectionModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
