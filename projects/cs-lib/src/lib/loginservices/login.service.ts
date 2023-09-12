/* P r o p r i e t a r y N o t i c e */
/* Unpublished © 2020 Allscripts Healthcare, LLC and/or its affiliates. All Rights
Reserved.
*
* P r o p r i e t a r y N o t i c e: This software has been provided pursuant to a License Agreement, with Allscripts
Healthcare, LLC and/or its affiliates, containing restrictions on its use. This software contains valuable trade secrets
and proprietary information of Allscripts Healthcare, LLC and/or its affiliates and is protected by trade secret and
copyright law. This software may not be copied or distributed in any form or medium, disclosed to any third parties,
or used in any manner not provided for in said License Agreement except with prior written authorization from
Allscripts Healthcare, LLC and/or its affiliates. Notice to U.S. Government Users: This software is “Commercial
Computer Software.”
Allscripts Common Services Operations Portal™ is a trademark of Allscripts Healthcare, LLC and/or its affiliates.
*
*
*/
/* P r o p r i e t a r y N o t i c e */

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
// import {of} from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import {
  AuthScopeInformation,
  LoginResponse,
} from '../model/index';
import {
  ApplicationNames,
  AuthScope,
  CoreConstants,
} from '../constants';

import { UserProfileService } from '../userprofileservice/userprofile.service';
import {
  AuthenticationType,
  AuthProviders,
  CsopSettings,
  IAppSettings,
  IAuthProviders,
  ICsopSettings,
  Validations,
  LoginUserProfile,
  // CsopLibSharedFunctions,
  Constants
} from '../../public-api';
import {CsopLibSharedFunctions} from '../shared/shared-functions';
import { ConfigService } from '../services/configservice/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isUserAuthenticated = false;
  private readonly authProvider: IAuthProviders = new AuthProviders();
  private readonly csopSettings: ICsopSettings = new CsopSettings();
  private scope!: AuthScopeInformation;

  public constructor(
    private readonly configService: ConfigService,
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly userProfileService: UserProfileService,
  ) {
    this.isUserAuthenticated = false;
    this.scope = new AuthScopeInformation('', AuthScope.Tenant, '');
    this.csopSettings = this.configService.config.csopsettings;
    this.authProvider = this.csopSettings.authProviders.filter(
      (provider: IAuthProviders) => provider.name === AuthenticationType.Shield)[0];
  }

  public getRefreshToken(
    app: string,
    originApp = app
  ): Observable<any> { // tslint:disable-line:no-any
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const loginResponse = new LoginResponse(false);
    this.setApplicationScopeObject(app);
    const refreshUrl = this.authProvider.endPoint + 'api/authentication/refresh/';
    const samlToken = this.storage.getItem(originApp + '-' + CoreConstants.SamlAuthToken);
    return this.http.post<any>(refreshUrl, // tslint:disable-line:no-any
      JSON.stringify({ AuthToken: samlToken, Scope: this.scope, IssueCompressToken: this.scope.issueCompressToken }), {
      observe: 'response',
      headers: headers,
      withCredentials: false
    }).pipe(map((response: any) => { // tslint:disable-line:no-any
      loginResponse.loginAllowed = true;
      const userProfile: LoginUserProfile = response.body.result;
      this.saveTokens(userProfile, app);
      //  this.setRefreshToken(response, app);
      if (app !== originApp) {
        this.setUserRoles(userProfile, app);
      }
      return of(loginResponse);
    })).pipe(
      catchError(error => {
        console.log(error);
        loginResponse.validation = Validations.refreshToken;
        return of(loginResponse);
      }));
  }

  public async getRefreshTokenPromise(
    app: string,
    originApp = app
  ): Promise<boolean> {

    const promise = this.getRefreshToken(app, originApp).toPromise();

    return new Promise<boolean>((resolve) => {
      promise.catch((error: any) => { // tslint:disable-line: no-any
        console.error(error);
        resolve(false);
      }).then((tokenResponse: any) => { // tslint:disable-line:no-any
        if (tokenResponse instanceof LoginResponse) {
          resolve(tokenResponse.loginAllowed);
        } else {
          tokenResponse.subscribe((tokenResponse$: LoginResponse) => {
            resolve(tokenResponse$.loginAllowed);
          });
        }
      });
    });
  }

  public login(
    userName: string,
    upName: string
  ): Observable<any> { // tslint:disable-line:no-any
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let loginResponse = new LoginResponse(false);
    this.isUserAuthenticated = false;
    const loginUrl = this.authProvider.endPoint + 'api/authentication/login/';
    this.setApplicationScopeObject(this.storage.getItem('app'));
    return this.http.post<any>(loginUrl, // tslint:disable-line:no-any
      JSON.stringify({ UserName: userName, Password: upName, Scope: this.scope, IssueCompressToken: this.scope.issueCompressToken }), {
      observe: 'response',
      headers: headers,
      withCredentials: true
    }).pipe((response: any) => { // tslint:disable-line:no-any
      // tslint:disable-next-line:no-uninitialized
      const userProfile: LoginUserProfile = response.body.result;
      loginResponse = this.setUserData(userProfile, this.storage.getItem('app'));
      return of(loginResponse);
    }).pipe(
      catchError(() => {
        loginResponse.validation = Validations.loginFailed;
        return of(loginResponse); // tslint:disable-line:strict-boolean-expressions
      }));
  }

  public redirectToAppLauncher() {
    window.location.replace('/');
  }

  public setUserRoles(
    userProfile: LoginUserProfile, // tslint:disable-line:no-any
    app: string
  ): LoginResponse {
    const loginResponse = new LoginResponse(false);
    // tslint:disable-next-line:strict-type-predicates
    if (userProfile !== null) {
      if (userProfile.permissions.length > 0) {
        loginResponse.loginAllowed = true;
        this.storage.setItem(app + '-roles', JSON.stringify(userProfile.permissions));
        this.storage.setItem('fullName', userProfile.lastName + ',' + userProfile.firstName);

        if (!this.verifyEmail(JSON.stringify(userProfile.email))) {
          loginResponse.loginAllowed = false;
          loginResponse.validation = Validations.accessDenied;
          this.storage.clear();
          this.redirectToAppLauncher();
        }
      } else {
        loginResponse.validation = Validations.unAuthorized + ApplicationNames.get(this.storage.getItem('app'));
      }
    }
    return loginResponse;
  }

  public verifyEmail(
    userEmail: string
  ): boolean {
    const email = this.storage.getItem(CoreConstants.email);
    // tslint:disable-next-line:prefer-switch
    if (email === null // tslint:disable-line:strict-boolean-expressions
      // tslint:disable-next-line:prefer-switch
      || email === undefined // tslint:disable-line:strict-boolean-expressions
      // tslint:disable-next-line:prefer-switch
      || email === CoreConstants.empty) {
      if (userEmail !== null // tslint:disable-line:strict-type-predicates
        && userEmail !== undefined) { // tslint:disable-line:strict-type-predicates
        userEmail = userEmail.replace(/"/g, '');
        this.storage.setItem(CoreConstants.email, userEmail.trim());
      }
      return true;
    } else {
      userEmail = userEmail.replace(/"/g, '');
      return (userEmail.toLowerCase().trim() === email.toLowerCase());
    }
  }

  private saveTokens(
    userProfile: LoginUserProfile,
    app: string
  ) {
    const jwtAuthToken = userProfile.tokenInfo.jwtToken;
    this.storage.setItem(app + '-' + CoreConstants.JwtAuthToken, jwtAuthToken);
    const samlAuthToken = userProfile.tokenInfo.samlToken;
    this.storage.setItem(app + '-' + CoreConstants.SamlAuthToken, samlAuthToken);
    this.setRefreshTokenTimer(userProfile.tokenInfo.validTo, app);
    this.userProfileService.saveUserProfile(app, Constants.defaultUserProfile, userProfile);
  }

  private setApplicationScopeObject(app: string, scopeName = Constants.defaultAuthenticationSettingName) {
    if (this.csopSettings.applications.length >= 0) {
      const apps = this.csopSettings.applications
        .filter((application: IAppSettings) => application.appName.toLowerCase() === app.toLowerCase());

      if (Array.isArray(apps) && apps.length > 0) {

        const scopeValues = CsopLibSharedFunctions.getAuthenticationSettingScopeValue(
          apps[0].authenticationMechanism.setting, scopeName);

        if (scopeValues !== undefined) {
          this.scope = new AuthScopeInformation(
            scopeValues.relyingParty,
            scopeValues.scope,
            scopeValues.scopeValue,
            scopeValues.issueCompressToken);
        }
      }
    }
  }

  // private setRefreshToken(
  //  response: any, // tslint:disable-line:no-any
  //  app: string
  // ) {
  //  if (response === null) {
  //    throw new Error('Response does not contain Refresh Token.');
  //  }

  //  if (response.status < HttpStatusCode.OK ||
  //    response.status >= HttpStatusCode.BadRequest
  //  ) {
  //    throw new Error('Bad response status: ' + response.status);
  //  }

  //  this.saveTokens(response, app);
  // }

  private setRefreshTokenTimer(
    expiryDateUTC: Date,
    app: string
  ) {
    const threshold = 60000; // 1 minute early
    const timeout = (new Date(expiryDateUTC)).valueOf() - (new Date()).valueOf() - threshold;
    setTimeout(() => {
      this.getRefreshToken(app).subscribe();
    }, timeout);
  }

  private setUserData(
    userProfile: LoginUserProfile, // tslint:disable-line:no-any
    app: string
  ): LoginResponse {
    this.isUserAuthenticated = false;

    const loginResponse = this.setUserRoles(userProfile, app);
    if (loginResponse.loginAllowed) {
      this.saveTokens(userProfile, app);
      this.isUserAuthenticated = true;
    }
    return loginResponse;
  }
}
