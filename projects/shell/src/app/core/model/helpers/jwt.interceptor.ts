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

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'projects/csop-lib/src/lib/services/configservice/configuration.service';
import { AzureAdService } from 'projects/csop-lib/src/lib/services/azureservices/azure-ad-service';
import {
  AuthenticationType,
  Constants,
  IAppSettings,
  IApiURL,
} from 'projects/csop-lib/src/public-api';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly apiEndPointURL: string;
  private readonly appSettings: IAppSettings[];
  public constructor(
    private readonly azureAdService: AzureAdService,
    private readonly configService: ConfigService, ) {

    if (this.configService.config.csopsettings.applications.length === 0) {
      this.configService.loadUrl('../assets/csopsettings.json');
    }

    this.appSettings = this.configService.config.csopsettings.
      applications.filter(
        (app: IAppSettings) => app.authenticationMechanism.name === AuthenticationType.AzureAd);

    const providers = this.appSettings[0].apiURLs.filter(
      (provider: IApiURL) => provider.name === Constants.defaultEndPointProviderName);

    this.apiEndPointURL = providers[0].url;
  }

  public intercept(
    request: HttpRequest<any>, // tslint:disable-line: no-any
    next: HttpHandler): Observable<HttpEvent<any>> { // tslint:disable-line: no-any

    return this.getToken()
      .mergeMap((isReceivedToken) => {
        if (isReceivedToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.azureAdService.accessToken}`
            }
          });
        }
        return next.handle(request);
      });
  }

  private getToken(): Observable<any> { // tslint:disable-line: no-any
    return Observable.fromPromise(
      this.azureAdService.getAccessToken(this.apiEndPointURL));
  }
}
