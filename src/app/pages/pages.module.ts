import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulo de roteamento
import { RoutingModule } from './routing.module';

//modules
import { ReusableModule } from '../reusable/reusable.module';

// Paginas
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    ReusableModule
  ]
})
export class PagesModule { }