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
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import {
  Observable,
  of,
  throwError
} from 'rxjs';
import {
  catchError,
  map
} from 'rxjs/operators';

import {
  DataRequest,
  DataServiceError,
  HttpUrlGenerator,
  HttpActionType,
  HttpStatusCode,
  IDataService,
  IQueryParams,
  Update
} from '../../public-api';

// mdrx code

/**
 * A basic, generic entity data service
 * suitable for persistence of most entities.
 * Assumes a common REST-y web API
 */
export class DefaultDataService<T> implements IDataService<T> {
  protected entityName: string;
  protected entityUrl: string;
  protected svcName: string;

  public get name() {
    return this.svcName;
  }

  public constructor(
    entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    protected urlRoot: string
  ) {
    this.svcName = `${entityName} DefaultDataService`;
    this.entityName = entityName;
    this.entityUrl = httpUrlGenerator.entityResource(entityName, urlRoot);
  }

  public add(
    entity: T
  ): Observable<T> {
    return this.execute(
      HttpActionType.POST,
      this.entityUrl,
      entity
    );
  }

  public delete(
    key: number | string
  ): Observable<number | string> {

    return this.execute(
      HttpActionType.DELETE,
      this.entityUrl + key
    )
      .pipe(
      // forward the id of deleted entity as the result of the HTTP DELETE
      map(() => key as number | string)
    );
  }

  public getAll(): Observable<T[]> {
    return this.execute(HttpActionType.GET, this.entityUrl);
  }

  public getById(
    key: number | string
  ): Observable<T> {
    return this.execute(
      HttpActionType.GET,
      this.entityUrl + key
    );
  }

  public getWithQuery(
    queryParams: IQueryParams | string
  ): Observable<T[]> {
    const qParams = typeof queryParams === 'string' ?
      { fromString: queryParams } : { fromObject: queryParams };
    const params = new HttpParams(qParams);
    return this.execute(
      HttpActionType.GET,
      this.entityUrl,
      undefined,
      { params }
    );
  }

  public update(
    update: Update<T>
  ): Observable<T> {
    return this.execute(
      HttpActionType.PUT,
      this.entityUrl + update.id,
      update.changes
    );
  }

  protected execute(
    method: HttpActionType,
    url: string,
    // data, error, or undefined/null
    data?: any, // tslint:disable-line: no-any
    options?: any // tslint:disable-line: no-any
  ): Observable<any> { // tslint:disable-line: no-any
    const req = new DataRequest(
      method,
      undefined,
      undefined,
      undefined,
      url,
      data,
      options
    );

    if (data instanceof Error === true) {
      return this.handleError(req)(data);
    }

    let result$!: Observable<ArrayBuffer>; // tslint:disable-line: no-uninitialized

    switch (method) {
      case HttpActionType.DELETE: {
        result$ = this.http.delete(url, options);
        break;
      }
      case HttpActionType.GET: {
        result$ = this.http.get(url, options);
        break;
      }
      case HttpActionType.POST: {
        result$ = this.http.post(url, data, options);
        break;
      }
      // N.B.: It must return an Update<T>
      case HttpActionType.PUT: {
        result$ = this.http.put(url, data, options);
        break;
      }
      default: {
        const error = new Error('Unimplemented HTTP method, ' + method);
        result$ = throwError(error);
      }
    }
    return result$.pipe(catchError(this.handleError(req)));
  }

  private handleDelete404(
    error: HttpErrorResponse,
    reqData: DataRequest) {
    if (error.status === HttpStatusCode.NotFound &&
      reqData.method === HttpActionType.DELETE) {
      return of({});
    }
    return undefined;
  }

  private handleError(reqData: DataRequest) {
    return (err: any) => { // tslint:disable-line: no-any
      const ok = this.handleDelete404(err, reqData);
      if (ok !== undefined) {
        return ok;
      }
      const error = new DataServiceError(err);
      return throwError(error);
    };
  }
}
