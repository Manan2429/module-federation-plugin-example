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
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import {
  Router, RouterModule,
} from '@angular/router';
import {
  HttpClient,
  HttpHandler,
  HttpClientModule,
} from '@angular/common/http';
import {
  throwError
} from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { IAppSettings } from 'projects/csop-lib/src/public-api';
import { APP_BASE_HREF } from '@angular/common';

import { ConfigService } from '../../../projects/csop-lib/src/lib/services/configservice/configuration.service';
import { StorageService } from '../core/services';
import {
  Validations,
} from '../../../projects/csop-lib/src/lib/types/constants';
import { LoginService } from '../../../projects/csop-lib/src/lib/services/loginservices/login.service';
import { LoginResponse } from '../core/model/login-response.model';
import { AppSelectorComponent } from '../app-selector/app-selector.component';
import { CoreAppContainerComponent } from '../app-container/core-app-container.component';
import { Applications, CoreConstants } from '../core/constants';
import * as csopData from '../../../csopsettings.json';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent> | undefined;
  let component: LoginComponent | undefined;
  // tslint:disable-next-line:no-uninitialized
  let mockStorageService: StorageService;
  // tslint:disable-next-line:no-uninitialized
  let mockLoginService: LoginService;
  // tslint:disable-next-line:no-uninitialized
  let router: Router;
  // tslint:disable-next-line:no-uninitialized
  let configService: ConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
        imports: [
          RouterModule.forRoot([]),
          RouterTestingModule.withRoutes([]),
          FormsModule,
          HttpClientModule,
        ],
        declarations: [
          LoginComponent,
          AppSelectorComponent,
          CoreAppContainerComponent
        ],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' },
          StorageService,
          LoginService,
          ConfigService,
          HttpClient,
          HttpHandler,
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();

      const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(CoreConstants.keyLength));
      Object.defineProperty(window, 'crypto', {
        value: { getRandomValues: mGetRandomValues },
      });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockStorageService = TestBed.get(StorageService);
    mockLoginService = TestBed.get(LoginService);
    configService = TestBed.get(ConfigService);
    const csopSettingData = JSON.stringify(csopData);
    configService.config = JSON.parse(csopSettingData);

    router = TestBed.get(Router);
    fixture.detectChanges();
    //  location = TestBed.get(Location);
  }));

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  function VerifyApplicationName(app: IAppSettings,
    spyOn: jasmine.Spy,
    componentFixture: ComponentFixture<LoginComponent>,
    loginComponent: LoginComponent) {

    spyOn.and.returnValue(app.appName);
    loginComponent.ngOnInit();
    componentFixture.detectChanges();
    const lableElement = componentFixture.debugElement.query(By.css('.title'));
    expect(app.appTitle).toEqual(lableElement.nativeElement.innerHTML);
  }

  it('should show Suitable Application Title as per CSOPSetting file', () => {
    if (component !== undefined) {
      component.applications = configService.config.csopsettings.applications;
    }
    const spy = spyOn(mockStorageService, 'getItem');

    configService.config.csopsettings.applications.forEach(app => {
      if (fixture !== undefined && component !== undefined) {

        VerifyApplicationName(app, spy, fixture, component);
      }
    });
  });

  it('should show error message if username is empty when submit form', () => {
    if (fixture !== undefined && component !== undefined) {

      component.errorMessage = '';
      component.uName = '';
      component.pwd = '';
      component.userLogin();

      expect(component.errorMessage).toEqual(component.uNameLabel + ' is required');
    }
  });

  it('should show error message if password is empty when submit form', () => {
    if (fixture !== undefined && component !== undefined) {

      component.errorMessage = '';
      component.uName = 'test';
      component.pwd = '';
      component.userLogin();

      expect(component.errorMessage).toEqual(component.pwdLabel + ' is required');
    }
  });

  it('should show "Login Failed" message if login faile', () => {
    if (fixture !== undefined && component !== undefined) {

      spyOn(mockLoginService, 'login').and.returnValue(throwError(new LoginResponse(false, Validations.loginFailed)));

      component.errorMessage = '';
      component.uName = 'test';
      component.pwd = 'test';

      component.userLogin();

      expect(mockLoginService.login).toHaveBeenCalled();
      expect(component.errorMessage).toEqual(Validations.loginFailed);
    }
  });

  it('should redirect to appropriate application on successfully login', fakeAsync(() => {
    if (fixture !== undefined) {

      if (component !== undefined) {
        component.applications = configService.config.csopsettings.applications;
        const loginResponse = new LoginResponse(true, 'test');

        spyOn(mockStorageService, 'getItem').and.returnValue(Applications.HubRegistry);
        const navigateSpy = spyOn(router, 'navigate');
        spyOn(mockLoginService, 'login').and.returnValue({ subscribe: () => loginResponse });
        component.errorMessage = '';
        component.uName = 'test';
        component.pwd = 'test';
        component.ngOnInit();
        component.userLogin();
        // tslint:disable-next-line:no-any
        (component as any).applicationRedirect(loginResponse);
        fixture.detectChanges();

        expect(mockLoginService.login).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['/shieldAuth']);
      }
    }
  }));
});
