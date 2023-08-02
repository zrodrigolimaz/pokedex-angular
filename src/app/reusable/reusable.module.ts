import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderbarComponent } from './headerbar/headerbar.component';


@NgModule({
  declarations: [
    HeaderbarComponent
  ],
  exports: [
    HeaderbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReusableModule { }
