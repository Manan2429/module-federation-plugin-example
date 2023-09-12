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

import { IAuthProviders } from '../../../public-api';

export class AuthProviders implements IAuthProviders {
  public cacheLocation: string;
  public clientID: string;  //// CSOP application Id which is register into Azure AD.
  public endPoint: string;
  public microsoftGraphApiEndpoint: string;
  public microsoftGraphApiScope: string[];
  public name: string;
  public redirectUri: string;
  public tenantId: string; //// Azure AD Id
  public constructor(
  ) {
    this.cacheLocation = '';
    this.clientID = '';
    this.endPoint = '';
    this.microsoftGraphApiScope = new Array<string>();
    this.microsoftGraphApiEndpoint = '';
    this.name = '';
    this.redirectUri = '';
    this.tenantId = '';
  }
}
