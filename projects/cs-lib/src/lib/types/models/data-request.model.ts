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
Allscripts CSOP-LIB™ is a trademark of Allscripts Healthcare, LLC and/or its affiliates.
*
*
*/
/* P r o p r i e t a r y N o t i c e */

// npm packages

// mdrx code
import { HttpActionType } from '../enum/http-action-type.enum';
import { Constants } from '../constants';

export class DataRequest {
  public constructor(
    public method: HttpActionType,
    public application?: string,
    public resourceIdentifier?: string,
    public subResourceIdentifier?: string,
    public actionVerb?: string,
    public data?: any, // tslint:disable-line: no-any
    public url?: string,
    public options?: any, // tslint:disable-line: no-any
    public busyIndicatorPlaceHolderId: string = '',
    public endPointProviderName: string = Constants.defaultEndPointProviderName,
  ) { }
}
