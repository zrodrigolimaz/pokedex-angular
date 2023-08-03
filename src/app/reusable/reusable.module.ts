import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderbarComponent } from './headerbar/headerbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ListComponent } from './list/list.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderbarComponent,
    SearchbarComponent,
    ListComponent
  ],
  exports: [
    HeaderbarComponent,
    SearchbarComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ReusableModule { }
