import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { APP_ROUTES } from './app.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthLibModule } from 'auth-lib';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppSelectorComponent } from './app-selector/app-selector.component';
import { LoginModule } from './login/login.module';
import { MsalModule } from '@azure/msal-angular';
// import { SharedLibModule } from 'projects/shared-lib/src/public-api';

@NgModule({
  imports: [
    BrowserModule,
    AuthLibModule,
    // SharedLibModule,
    HttpClientModule,
    LoginModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    MsalModule
    // MsalModule.forRoot(new PublicClientApplication
    //   (
    //     {
    //       auth:{
    //         clientId:'c1255680-789e-4e12-8838-e85405c9aae6',
    //         redirectUrl:'http://localhost:5000/azureAd',
    //         authority:'https://login.microsoftonline.com/ab8614a3-38fa-4410-81cc-2cff09afdee1'
    //       }
    //     }
    //   ))
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AppSelectorComponent,
    NotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
