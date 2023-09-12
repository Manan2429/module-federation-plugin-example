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
Allscripts Common Services Operations Portal is a trademark of Allscripts Healthcare, LLC and/or its affiliates.
*
*
*/
/* P r o p r i e t a r y N o t i c e */
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MsalBroadcastService, MsalService  } from '@azure/msal-angular';
import { JwksValidationHandler, ValidationParams } from 'angular-oauth2-oidc';
import jwt_decode from 'jwt-decode';
import { User } from 'msal';
import { Subscription } from 'rxjs';
import {
  AppProfile,
  AzureUserProfile
} from '../model/index';
import { ProfileRoleHelper } from '../../../../shell/src/app/core/model/helpers/index';

import {
  AuthenticationType,
  AuthProviders,
  Constants,
  CsopSettings,
  IAuthProviders,
  ICsopSettings
} from '../../public-api';
import { ConfigService } from '../services/configservice/configuration.service';
// import { CsopDialogService } from '../dialogservices/csop-dialog.service';
import { GenericDataService } from '../dataservice/generic-data.service.';

@Injectable({
  providedIn: 'root'
})
export class AzureAdService implements OnDestroy {

  // To Do : Nisarg
  public accessToken = '';
  public selectedApplication = Constants.empty;
  private authProviders: IAuthProviders = new AuthProviders();
  private csopSettings: ICsopSettings = new CsopSettings();
  private readonly subscription: Subscription = new Subscription();
  private user: User | undefined;
  public constructor(private readonly broadcastService: MsalBroadcastService,
    private readonly configService: ConfigService,
    private readonly genericDataService: GenericDataService,
    private readonly profileRoleHelper: ProfileRoleHelper,
    private readonly msalService: MsalService,
    private readonly http: HttpClient,
    // private readonly csopService: CsopDialogService
  ) {
  }

  public async getAccessToken(endpointUri: string): Promise<boolean> {

    this.accessToken = '';
    const scopes = this.msalService.getScopesForEndpoint(endpointUri);
    return new Promise<boolean>((resolve) => {
      this.msalService.acquireTokenSilent(scopes)
        .then(accessToken => {
          this.accessToken = accessToken;
          resolve(true);
          // tslint:disable-next-line: promise-function-async
        }).catch(() => {
          if (localStorage.getItem('msal.idtoken') === null || localStorage.getItem('msal.idtoken') === Constants.empty) {
            this.msalService.logout();
          } else {
            this.msalService.acquireTokenRedirect(scopes);
          }
        });
    });
  }

  // tslint:disable-next-line: no-any
  public async getAppRoles(app: AppProfile): Promise<any> {

    // tslint:disable-next-line: no-any
    return new Promise<any>((resolve, reject) => {
      const url = this.authProviders.microsoftGraphApiEndpoint +
        'beta/applications?$filter=appId eq \'' +
        app.applicationId + '\'';

      this.http.get(
        url,
        this.genericDataService.getHttpOptions(this.accessToken))
        .toPromise()
        .catch(err => {
          // log error
          reject(new Error(err));
        })
        .then(
          (data) => {
            const appProfile = this.profileRoleHelper.setRolesForAppProfile(data, app);
            resolve(appProfile);
          });
    });
  }

  public async getAzureUserProfile(userIdentifier?: string): Promise<Array<AzureUserProfile>> {

    return new Promise<Array<AzureUserProfile>>((resolve, reject) => {

      this.getAccessToken(this.authProviders.microsoftGraphApiEndpoint)
        .then(isReceivedToken => {

          if (isReceivedToken) {
            userIdentifier = this.getUserOid();
            this.http.get(
              this.authProviders.microsoftGraphApiEndpoint + 'beta/users/' + userIdentifier + '/appRoleAssignments',
              this.genericDataService.getHttpOptions(this.accessToken))
              .toPromise()
              .catch(err => {
                // Log error
                console.error(err);
              })
              .then(
                (data) => {
                  const listAzureUserProfile = this.profileRoleHelper.getAzureUserProfiles(data);
                  resolve(listAzureUserProfile);
                }
              );
          }
        }).catch(error => {
          reject(new Error(error));
        });
    });
  }

  // tslint:disable-next-line: no-any
  public async getIdToken(): Promise<any> {
    // tslint:disable-next-line: no-any
    return new Promise<any>((resolve, reject) => {
      this.loadJwks().then((jwks) => {
        const tokenInfo = localStorage.getItem('msal.idtoken');
        if (tokenInfo !== null) {
          // tslint:disable-next-line: no-inferred-empty-object-type
          let token =  new Object( jwt_decode(tokenInfo));
          const jwksValidationHandler = new JwksValidationHandler();
          const validationParams: ValidationParams = {
            accessToken: '',
            idToken: tokenInfo,
            jwks: jwks,
            idTokenClaims: token,
            idTokenHeader: this.getHeaderOfIdToken(tokenInfo),
            // tslint:disable-next-line: promise-function-async
            loadKeys: () => new Promise<object>(resolve)
          };

          jwksValidationHandler.validateSignature(validationParams)
            .then(() => {
              resolve(token);
            },
              // tslint:disable-next-line:no-any
              (error: any) => {
                reject(error);
              });
        }
      });
    });
  }

  public isUserAuthenticated(): boolean {
    return this.msalService._oauthData.isAuthenticated;
  }
                    
  public logout() {
    // const app = element.options[element.selectedIndex].value;
    const app = (document.getElementById('appChange') as HTMLSelectElement).value;
    const selectedApp = this.selectedApplication !== Constants.empty ? this.selectedApplication : app;
    const authentication = this.configService.config.csopsettings.applications.find(x => x.appName === selectedApp);
    if (authentication !== undefined && authentication.authenticationMechanism.name === AuthenticationType.AzureAd) {
      localStorage.clear();
      this.msalService.logout();
    } else {
      this.removeContent();
      window.location.replace('/');
    }
  }

  public ngOnDestroy() {
    this.broadcastService.msalSubject$().next(1);
    // tslint:disable-next-line: strict-boolean-expressions
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public sendWarningMessage = async () => {
    await this.csopService.openWarningDialog(
      Constants.sessionWarning,
      Constants.sessionWarningMessage,
      false,
      false
    )
      .catch(err => {
        if (err !== undefined &&
          err !== false &&
          err !== 1
        ) {
          console.log(err);
        }
      });
  }

  private b64DecodeUnicode(headerBase64: string) {
    const base64 = headerBase64.replace(/\-/g, '+').replace(/\_/g, '/');
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          // tslint:disable-next-line:no-magic-numbers
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  private fetchAzureAdConfigration() {
    if (this.configService.config.csopsettings.applications.length === 0) {
      this.configService.loadUrl('../assets/csopsettings.json');
    }
    this.csopSettings = this.configService.config.csopsettings;
    this.authProviders = this.csopSettings.authProviders.filter(
      (provider: IAuthProviders) => provider.name === AuthenticationType.AzureAd)[0];
  }

  private getHeaderOfIdToken(idToken: string): object {
    const tokenParts = idToken.split('.');
    const headerBase64 = this.padBase64(tokenParts[0]);
    const headerJson = this.b64DecodeUnicode(headerBase64);
    return JSON.parse(headerJson);
  }

  private getUserOid(): string {
    this.user = this.msalService.getuser();
    // @ts-ignore
    const oid = this.user.idToken['oid'].toString();
    return oid;
  }

  private async loadJwks(): Promise<object> {
    this.fetchAzureAdConfigration();

    return new Promise<object>((resolve, reject) => {
      const url = 'https://login.microsoftonline.com/' + this.authProviders.tenantId + '/discovery/v2.0/keys';
      this.http.get(url)
        .subscribe(
          (jwks: object) => {
            resolve(jwks);
          }
          // tslint:disable-next-line:no-any
          , (err: any) => {
            console.error(err);
            reject(err);
          }
        );
    });
  }

  private padBase64(base64data: string): string {
    // tslint:disable-next-line:no-magic-numbers
    while (base64data.length % 4 !== 0) {
      base64data += '=';
    }
    return base64data;
  }

  private removeContent() {
    const content = document.getElementById('content');
    if (content !== null) {
      while (content.firstChild !== null) {
        content.removeChild(content.firstChild);
      }
    }
  }
}
