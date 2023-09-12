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
import { MsalConfig } from '@azure/msal-angular';

import {
  AuthenticationType,
  CsopSettings,
  Constants,
  Configuration,
  IAppSettings,
  IAuthProviders,
  CsopLibSharedFunctions,
} from '../../public-api';

export class AzureAdConfigLoader {
  public static getAzureConfig() {
    const request = new XMLHttpRequest();
    let config = new Configuration(new CsopSettings());

    request.open('GET', '../assets/csopsettings.json', false);
    // tslint:disable-next-line: no-null-keyword
    request.send(null);
    const response = JSON.parse(request.responseText);
    config = response as Configuration;

    return config.csopsettings;
  }

  public static getMsalConfig(appName: string, endPointProviderName: string = Constants.defaultEndPointProviderName) {

    const csopSettings = this.getAzureConfig();

    const adAuthProverSetting = csopSettings.authProviders.filter((provider: IAuthProviders) =>
      provider.name === AuthenticationType.AzureAd)[0];

    const msalConfigNew = new MsalConfig();
    if (appName !== Constants.empty) {
      const appSetting = csopSettings.applications.filter((app: IAppSettings) => app.appName === appName);

      if (appSetting.length > 0) {
        const apiEndPointProvider = appSetting[0].apiURLs.filter((endPointProvider) =>
          endPointProvider.name === endPointProviderName);

        const scopeValues = CsopLibSharedFunctions.getAuthenticationSettingScopeValue(
          appSetting[0].authenticationMechanism.setting);

        if (scopeValues !== undefined) {
          msalConfigNew.consentScopes = scopeValues.apiScope;
          msalConfigNew.protectedResourceMap = [
            [
              apiEndPointProvider[0].url,
              scopeValues.apiScope
            ]
          ];
        }
      }
    }

    msalConfigNew.clientID = adAuthProverSetting.clientID;
    msalConfigNew.authority = adAuthProverSetting.endPoint + adAuthProverSetting.tenantId;
    msalConfigNew.redirectUri = csopSettings.redirectUri;
    msalConfigNew.cacheLocation = adAuthProverSetting.cacheLocation;

    //// *** Please Don't remove below code, it is for Microsoft graph api ********* ///
    // msalConfig.consentScopes = azureAdSettings.microsoftGraphApiScope.concat(azureAdSettings.cqApiScope);
    // msalConfig.protectedResourceMap = [
    //  [
    //    azureAdSettings.microsoftGraphApiEndpoint,
    //    azureAdSettings.microsoftGraphApiScope
    //  ],
    //  [
    //    azureAdSettings.cqApiEndpoint,
    //    azureAdSettings.cqApiScope
    //  ]
    // ];
    //// *** Please Don't remove above code, it is for Microsoft graph api ********* ///

    return msalConfigNew;
  }
}
