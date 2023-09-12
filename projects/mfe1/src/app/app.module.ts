import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightsModule } from './flights/flights.module';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { ConfigService } from 'projects/cs-lib/src/public-api';
import { MainComponent } from './main/main/main.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlightsModule,
    HomeModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [
    // HomeComponent,
    AppComponent,
    MainComponent,
  ],
  providers: [],
  bootstrap: [
      AppComponent
  ]
})
export class Mfe1AppModule { }
