import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { DropdownMenuComponent } from 'src/app/components/dropdown-menu/dropdown-menu.component';
import { SearchInputComponent } from 'src/app/components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoaderComponent, DropdownMenuComponent, SearchInputComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [LoaderComponent, DropdownMenuComponent, SearchInputComponent]
})
export class SharedModule {}

