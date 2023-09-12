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

// npm packages
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  Observable,
  of,
  throwError
} from 'rxjs';

// import { CsopProgressBarType } from '../../types/enum/csop-progressbar-type.enum';
// import { CsopProgressBarSize } from '../../types/enum/csop-progressbar-size.enum';
import {
  StorageService
} from '../../lib/storage/storage.service';
import {
  CsopProgressBarService,
  DataRequest,
  DataServiceError,
  HttpActionType,
  HttpStatusCode,
  ICsopProgressBar,
} from '../../public-api';
import { Constants } from '../../lib/types/constants';
import { CsopProgressBarSize } from '../types/enum/csop-progressbar-size.enum';
import { CsopProgressBarType } from '../types/enum/csop-progressbar-type.enum';

// mdrx code

/**
 * A basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */

@Injectable({
  providedIn: 'root'
})

export class GenericDataService {
  protected apiRoot = 'api';
  protected queryUrl: string;
  public constructor(
    private readonly progressBarService: CsopProgressBarService,
    private readonly storageService: StorageService,
    protected http: HttpClient) {
    this.queryUrl = '';
  }

  public execute(
    dataRequestOptions: DataRequest
  ): Observable<any> { // tslint:disable-line: no-any
    this.showHideProgressBar(true, dataRequestOptions.busyIndicatorPlaceHolderId);
    // this.queryUrl = `${this.apiRoot}/${application}/${resource}/${actionVerb}/`.toLowerCase();
    this.queryUrl = this.apiRoot +
      '/' + dataRequestOptions.application +
      '/' + dataRequestOptions.endPointProviderName;

    if (dataRequestOptions.resourceIdentifier !== undefined && dataRequestOptions.resourceIdentifier !== '') {
      this.queryUrl += '/' + dataRequestOptions.resourceIdentifier;
    }

    if (dataRequestOptions.subResourceIdentifier !== undefined) {
      this.queryUrl += '/' + dataRequestOptions.subResourceIdentifier;
    }

    if (dataRequestOptions.actionVerb !== undefined) {
      this.queryUrl += '/' + dataRequestOptions.actionVerb;
    }

    if (dataRequestOptions.url !== undefined) {
      this.queryUrl += dataRequestOptions.url;
    }

    this.queryUrl.toLowerCase();

    /*     this.queryUrl = `${this.apiRoot}/
    ${dataRequestOptions.application}/
    ${dataRequestOptions.resourceIdentifier}/
    ${dataRequestOptions.actionVerb}/`
          .toLowerCase();
     */

    if (dataRequestOptions.data instanceof Error === true) {
      return this.handleError(dataRequestOptions)(dataRequestOptions.data);
    }

    let result$!: Observable<ArrayBuffer>; // tslint:disable-line: no-uninitialized
    switch (dataRequestOptions.method) {
      case HttpActionType.DELETE: {
        result$ = this.http.delete(this.queryUrl, dataRequestOptions.options);
        break;
      }
      case HttpActionType.GET: {
        result$ = this.http.get(this.queryUrl, dataRequestOptions.options);
        break;
      }
      case HttpActionType.POST: {
        result$ = this.http.post(this.queryUrl, dataRequestOptions.data, dataRequestOptions.options);
        break;
      }
      // N.B.: It must return an Update<T>
      case HttpActionType.PUT: {
        result$ = this.http.put(this.queryUrl, dataRequestOptions.data, dataRequestOptions.options);
        break;
      }
      default: {
        const error = new Error('Unimplemented HTTP method, ' + dataRequestOptions.method);
        result$ = throwError(error);
      }
    }
    return result$.pipe(
      catchError(this.handleError(dataRequestOptions)),
      map((res: any) => { // tslint:disable-line: no-any
        if (res === null) { // tslint:disable-line: strict-type-predicates
          res = undefined;
        }
        this.showHideProgressBar(false, dataRequestOptions.busyIndicatorPlaceHolderId);
        return res;
      })
    );
  }

  public getHttpOptions(accessToken: string) {
    const bearer = 'Bearer ' + accessToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: bearer
      })
    };
    return httpOptions;
  }

  /**
    * Show/Hide Busy Indicator on API Call
    */
  public showHideProgressBar(
    show: boolean,
    busyIndicatorPlaceholderId: string
  ) {
    const progressBar: ICsopProgressBar = {
      // isModal: false,
      message: '',
      progressbarComponentId: busyIndicatorPlaceholderId,
      progType: CsopProgressBarType.Indeterminate,
      showPercentLabel: false,
      // spinnerSize: CsopProgressBarSize.Normal,
      visible: show,
      // wholePage: true
    };
    this.progressBarService.showHide(progressBar);
  }

  private handleError(
    reqData: DataRequest
  ) {
    return (err: any) => { // tslint:disable-line: no-any
      if (err !== undefined &&
        err.status !== undefined) {
        switch (err.status) {
          case HttpStatusCode.BadGateway:
          case HttpStatusCode.SessionTimeout:
          case HttpStatusCode.GatewayTimeout:
          case HttpStatusCode.UnknownError:
            this.showHideProgressBar(false, reqData.busyIndicatorPlaceHolderId);
            const event = new Event('session timeout', { bubbles: true, cancelable: false });
            const app = this.storageService.getItem('app');
            const elem = document.getElementsByTagName(app)[0];
            elem.dispatchEvent(event);
            return of({});
          case HttpStatusCode.NotFound:
            this.showHideProgressBar(false, reqData.busyIndicatorPlaceHolderId);
            if (reqData.method === HttpActionType.DELETE) {
              return of({});
            }
            break;
          case HttpStatusCode.Unauthorized:
            err.error = Constants.unauthorized;
            window.location.replace('/');
            break;
          default:
            this.showHideProgressBar(false, reqData.busyIndicatorPlaceHolderId);
        }
      }

      return throwError(new DataServiceError(err));
    };
  }
}
