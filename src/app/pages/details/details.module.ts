import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details.component';

import { ReusableModule } from '../../reusable/reusable.module'; 


const routes: Routes = [
  { path: ':id', component: DetailsComponent }
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    ReusableModule 
  ],
  declarations: [DetailsComponent],
  exports: [RouterModule]
})
export class DetailsModule { }
