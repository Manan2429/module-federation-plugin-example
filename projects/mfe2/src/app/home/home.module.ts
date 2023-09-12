import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FlightsSearchComponent } from './flights-search/flights-search.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routes';
import { AuthLibModule } from 'auth-lib';
import { SharedLibModule } from 'shared-lib';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthLibModule,
    SharedLibModule,
    RouterModule.forChild(HOME_ROUTES),
    FormsModule
  ],
  declarations: [
    // FlightsSearchComponent
    HomeComponent
  ]
})
export class HomeModule { }
