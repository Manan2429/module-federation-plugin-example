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
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public clear(): void {
    localStorage.clear();
  }

  public getItem(key: string): any { // tslint:disable-line:no-any
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem(key) || '' // tslint:disable-line:strict-boolean-expressions
     , this.getKey('ukey') || '').toString(CryptoJS.enc.Utf8); // tslint:disable-line:strict-boolean-expressions
    return bytes;
  }

  public getKey(key: string) {
    return localStorage.getItem(key);
  }

  public observe(key: string): Observable<any> { // tslint:disable-line:no-any
    return this.observe(key);
  }
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public setItem(key: string, value: any) { // tslint:disable-line:no-any
    value = CryptoJS.AES.encrypt(value, this.getKey('ukey') || ''); // tslint:disable-line:strict-boolean-expressions
    localStorage.setItem(key, value);
  }
  public storeKey(ukey: string) {
    localStorage.setItem('ukey', ukey);
  }
}
