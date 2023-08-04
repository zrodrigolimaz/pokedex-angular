import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule } from './routing.module';
import { ReusableModule } from '../reusable/reusable.module';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    ReusableModule
  ]
})
export class PagesModule { }