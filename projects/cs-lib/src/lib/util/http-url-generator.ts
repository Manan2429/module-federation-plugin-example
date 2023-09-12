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
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpUrlGenerator {
  public entityResource(
    entityName: string,
    root: string
  ): string {
    if (root !== '') {
      root = normalizeRoot(root);
      return `${root}/${entityName}/`.toLowerCase();
    } else {
      return `api/${entityName}/`.toLowerCase();
    }
  }
}

/** Remove leading & trailing spaces or slashes */
export function normalizeRoot(
  root: string
) {
  return root.replace(/^[\/\s]+|[\/\s]+$/g, '');
}
