import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollectionComponent } from 'src/app/components/collection/collection.component';
import { SharedModule } from '../shared/shared.module';
import { FlashcardPreviewComponent } from 'src/app/components/collection/flashcard-preview/flashcard-preview.component';
import { FlashcardDisplayComponent } from 'src/app/components/flashcard-display/flashcard-display.component';
import { CreateDefinitionFlashcardFormComponent } from 'src/app/components/flashcard-form/definition-flashcard-form/create-definition-flashcard-form/create-definition-flashcard-form.component';
import { DefinitionFlashcardFormComponent } from 'src/app/components/flashcard-form/definition-flashcard-form/definition-flashcard-form.component';
import { EditDefinitionFlashcardFormComponent } from 'src/app/components/flashcard-form/definition-flashcard-form/edit-definition-flashcard-form/edit-definition-flashcard-form.component';
import { FlashcardFormComponent } from 'src/app/components/flashcard-form/flashcard-form.component';
import { CreateTranslationFlashcardFormComponent } from 'src/app/components/flashcard-form/translation-flashcard-form/create-translation-flashcard-form/create-translation-flashcard-form.component';
import { EditTranslationFlashcardFormComponent } from 'src/app/components/flashcard-form/translation-flashcard-form/edit-translation-flashcard-form/edit-translation-flashcard-form.component';
import { TranslationFlashcardFormComponent } from 'src/app/components/flashcard-form/translation-flashcard-form/translation-flashcard-form.component';
import { MatchHeightDirective } from 'src/app/directives/matchHeight/match-height.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CollectionComponent,
        DefinitionFlashcardFormComponent,
        MatchHeightDirective,
        FlashcardFormComponent,
        CreateDefinitionFlashcardFormComponent,
        TranslationFlashcardFormComponent,
        CreateTranslationFlashcardFormComponent,
        FlashcardPreviewComponent,
        EditTranslationFlashcardFormComponent,
        EditDefinitionFlashcardFormComponent,
        FlashcardDisplayComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: CollectionComponent }]),
        SharedModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class CollectionModule {}

