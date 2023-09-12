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
// import * as moment from 'moment';

import {
  Constants,
} from '../types/constants';
import { DataServiceError } from '../dataservice/data-service-error';
import { HttpStatusCode } from '../types/enum/http-status-code.enum';
import { KeyValuePairModel } from '../types/models/keyvaluepair.model';
import {
  DateParts,
  DateTimePartsInNumber,
} from '../types/enum/dateparts.enum';
import { ISetting } from '../../public-api';

export class CsopLibSharedFunctions {
  public static b64DecodeUnicode(headerBase64: string) {
    const base64 = headerBase64.replace(/\-/g, '+').replace(/\_/g, '/');
    const uri_enc = encodeURIComponent(base64);
    return decodeURIComponent(uri_enc);
  }

  public static compareDate(
    date1: Date,
    date2: Date) {
    if (date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()) {
      return Constants.EqualsDate;
    } else {
      if (date1 > date2) {
        return Constants.GreaterDate;
      }
      if (date1 < date2) {
        return Constants.SmallerDate;
      }
    }
  }

  public static containsNumbersAndDashesOnly(
    data: string
  ) {
    const pattern = /[^0-9\-]/g;
    return this.testRegEx(data, pattern);
  }

  public static containsNumbersAndDotsOnly(
    data: string
  ) {
    const pattern = /[^0-9\.]/g;
    return this.testRegEx(data, pattern);
  }

  public static containsNumbersOnly(
    data: string
  ) {
    const pattern = /[^0-9]/g;
    return this.testRegEx(data, pattern);
  }

  // tslint:disable-next-line:no-any
  public static convertJsonToCsv(data: any, headerLiist: string[]): string {
    const header = Object.keys(data[0]);
    // tslint:disable-next-line:no-any
    const csv = data.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(headerLiist.join(','));
    const csvArray = csv.join('\r\n');
    return csvArray;

  }

  public static getAbsoluteDate(dateStr: Date) {
    // tslint:disable-next-line:strict-boolean-expressions
    if (!dateStr) { return ''; }
    let result = '';
    // const dNow = moment();
    // const dPast = moment(dateStr);

    // if ( dNow.unix() - dPast.unix() < 86400) {
    // if same day, show just the time, otherwise show the date
    // if (dNow.dayOfYear() === dPast.dayOfYear()) {
    //   result = moment(dateStr).format('hh:mm a');
    // } else {
    //   result = moment(dateStr).format('DD MMM YYYY');
    // }

    return result;
  }

  public static getAuthenticationSettingScopeValue(authenticationMechanismSetting: Array<ISetting>,
    scopeName = Constants.defaultAuthenticationSettingName): ISetting | undefined {
    const scopeValues = authenticationMechanismSetting.filter((setting: ISetting) =>
      setting.name.toLowerCase() === scopeName.toLowerCase());
    if (scopeValues.length > 0) {
      return scopeValues[0];
    }
    return undefined;
  }

  public static getdateDiff(
    fromDate: Date,
    toDate: Date
  ): Array<KeyValuePairModel<DateParts, number>> {
    let dateDifferencebyParts: Array<KeyValuePairModel<DateParts, number>>
      = new Array<KeyValuePairModel<DateParts, number>>();

    dateDifferencebyParts = this.getdateDifference(Date.parse(fromDate.toString()), Date.parse(toDate.toString()));

    return dateDifferencebyParts;
  }

  /**
 * Get date differe between two date into Year, Month, Days, Hours and Minites
 * @param fromDate = from Date (in milliseconds)
 * @param toDate = To Date (in milliseconds)
 */
  public static getdateDifference(
    fromDate: number,
    toDate: number
  ): Array<KeyValuePairModel<DateParts, number>> {
    const dateDifferencebyParts: Array<KeyValuePairModel<DateParts, number>>
      = new Array<KeyValuePairModel<DateParts, number>>();

    try {
      const diffMilliseconds = (toDate - fromDate); // milliseconds between fromDate & toDate
      const diffDays = Math.floor(diffMilliseconds / DateTimePartsInNumber.NumberOfMiliSecondInDays); // days

      const diffHrs = Math.floor(
        (diffMilliseconds % DateTimePartsInNumber.NumberOfMiliSecondInDays) /
        DateTimePartsInNumber.NumberOfMiliSecondInHour); // hours

      const diffMins = Math.round((
        (
          diffMilliseconds % DateTimePartsInNumber.NumberOfMiliSecondInDays
        ) % DateTimePartsInNumber.NumberOfMiliSecondInHour
      ) / DateTimePartsInNumber.NumberOfMiliSecondInMinutes);
      // minutes

      const diffmonths = Math.floor(diffDays / DateTimePartsInNumber.NumberOfDaysInMonth); // month

      const diffyears = Math.floor(diffmonths / DateTimePartsInNumber.NumberOfMonthInYear); // year

      dateDifferencebyParts.push(new KeyValuePairModel(DateParts.Years, diffyears));
      dateDifferencebyParts.push(new KeyValuePairModel(DateParts.Months, diffmonths));
      dateDifferencebyParts.push(new KeyValuePairModel(DateParts.Days, diffDays));
      dateDifferencebyParts.push(new KeyValuePairModel(DateParts.Hours, diffHrs));
      dateDifferencebyParts.push(new KeyValuePairModel(DateParts.Minutes, diffMins));
      return dateDifferencebyParts;
    } catch (error) {
      console.log(error);
    }

    return dateDifferencebyParts;
  }

  // tslint:disable-next-line:no-any
  public static getDifferenceofObjects(updatedObj: any, obj: any) {
    const keys = Object.keys(updatedObj);
    const update: string[] = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (updatedObj[key] !== obj[key]) {
        update.push(key);
      }
    }
    return update;
  }

  public static getErrorMessage(
    err: any // tslint:disable-line: no-any
  ): string {
    if (err !== undefined && // tslint:disable-line: strict-type-predicates
      err.error !== undefined && // tslint:disable-line: strict-type-predicates
      err.error.status !== undefined && // tslint:disable-line: strict-type-predicates
      (err.error.status === HttpStatusCode.Unauthorized ||
        err.error.status === HttpStatusCode.Forbidden)
    ) {
      return Constants.unauthorized;
    } else if (err !== undefined && // tslint:disable-line: strict-type-predicates
      err.error !== undefined && // tslint:disable-line: strict-type-predicates
      err.error.error !== null && // tslint:disable-line: strict-type-predicates
      err.error.error !== undefined) { // tslint:disable-line: strict-type-predicates
      if (typeof err.error.error === 'object') {
        if (err.error.error.message !== undefined && // tslint:disable-line: strict-type-predicates
          typeof err.error.error.message === 'string'
        ) {
          return err.error.error.message;
        } else if (Array.isArray(err.error.error.details) && err.error.error.details.length > 0) {
          return Object.values(err.error.error.details).join(Constants.newLine);
        } else if (typeof err.error.error.title === 'string') {
          return err.error.error.title;
        }
      } else if (typeof err.error.error === 'string') {
        return err.error.error;
      }
    }
    return (new DataServiceError(err)).message;
  }

  public static getItemsLimit(
    height: number,
    positionY: number,
  ): number {
    const actualPageSize = window.innerHeight - positionY;
    if (actualPageSize > 1) {
      let totalItems = Math.floor(actualPageSize / height);
      if (totalItems > 1) {
        return (totalItems -= 1);
      }
    }
    return 1;
  }

  public static getRelativeDate(dateStr: Date) {
    // tslint:disable-next-line:strict-boolean-expressions
    if (!dateStr) { return ''; }
    // return moment(dateStr).fromNow();
  }

  public static getTableHeight(
    positionY: number,
    additionalAdjustSpace = 0
  ): number {
    return (window.innerHeight - positionY - additionalAdjustSpace);
  }

  public static isValidDate(
    date: string
  ): boolean {
    const tempDate = new Date(date);
    // returns true if valid else false
    return !isNaN(tempDate.getTime());
  }

  public static isValidEmailId(emailId: string): boolean {
    // tslint:disable-next-line:max-line-length
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !this.testRegEx(emailId, pattern);
  }

  public static paddingValue(inputValue: string, length: number, valueToPad: string, leftPadding: boolean = true): string {
    while (inputValue.length < length) {
      inputValue = leftPadding ? valueToPad + inputValue : inputValue + valueToPad;
    }
    return inputValue;
  }

  public static trimContents(
    contents: string,
    trimLen: number,
    addTrailingDots: boolean = true,
  ): string {
    let trimmedContents = contents;
    if (contents.length > trimLen) {
      trimmedContents = contents.substr(0, trimLen);
      if (addTrailingDots) {
        trimmedContents += '...';
      }
    }
    return trimmedContents;
  }
  private static testRegEx(
    data: string,
    pattern: RegExp
  ): boolean {
    const result = data.match(pattern);
    return result === null;
  }
}
