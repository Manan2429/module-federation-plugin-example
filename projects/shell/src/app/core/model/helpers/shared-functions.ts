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

export class SharedFunctions {
  public static makeRandomString(lengthOfCode: number, possible?: string): string {
    let text = '';
    if (possible === undefined) { // || possible === null) { // commented to resolve lint error
      possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`; // tslint:disable-line:quotemark
    }
    let array = new Uint32Array(lengthOfCode);
    window.crypto.getRandomValues(array);
    // tslint:disable-next-line:no-non-null-assertion
    array = array.map(x => possible!.charCodeAt(x % possible!.length));
    text = String.fromCharCode.apply(undefined, Array.from(array));
    return text;
  }

  public static  sleep(milliseconds: number) {
    const start = new Date().getTime();
    do {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    } while (true);
  }

}
