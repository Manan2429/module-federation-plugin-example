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

/**
 * Error from a IDataService
 * The source error either comes from a failed HTTP response or was thrown within the service.
 * @param error the HttpErrorResponse or the error thrown by the service
 */
// If extend from Error, `dse instanceof DataServiceError` returns false
// in some (all?) unit tests so don't bother trying.

import { HttpErrorResponse } from '@angular/common/http';

export class DataServiceError {
  public message: string;

  public constructor(
    public error: string | HttpErrorResponse  // tslint:disable-line
  ) {
    if (typeof error === 'string') {
      this.message = error;
    } else {
      this.message = this.extractMessage(error);
    }
  }
  // Many ways the error can be shaped. These are the ways we recognize.
  private extractMessage(sourceError: HttpErrorResponse): string { // tslint:disable-line

    const { error, message } = sourceError;
    let errMessage = '';
    if (error !== undefined && error !== null) {
      // prefer HttpErrorResponse.error to its message property
      errMessage = typeof error === 'string' ?
        error : (error.error !== undefined && typeof error.error === 'string') ?
          error.error : error.message !== undefined ?
            error.message : '';
    } else {
      errMessage = message;
    }

    return errMessage;
  }
}
