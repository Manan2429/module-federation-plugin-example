import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainComponent } from '../main/main/main.component';
// import { FlightsSearchComponent } from './flights-search/flights-search.component';

export const HOME_ROUTES: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'main',
      component: MainComponent
    }

];
