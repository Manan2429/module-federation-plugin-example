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

import { TestBed, ComponentFixture, } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MSAL_CONFIG, MsalService } from '@azure/msal-angular/dist/msal.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as csopData from 'csopsettings.json';
import { AuthenticationType } from 'projects/csop-lib/src/public-api';
import { ConfigService } from 'projects/csop-lib/src/lib/services/configservice/configuration.service';
// tslint:disable-next-line:max-line-length
import { ShieldPassiveFederationService } from 'projects/csop-lib/src/lib/services/shieldpassivefederationservice/shield-passive-federation-service';

import { CoreConstants } from '../core/constants';

import { AppSelectorComponent } from './app-selector.component';

describe('AppSelectorComponent', () => {
  // tslint:disable:no-uninitialized
  let component: AppSelectorComponent;
  let fixture: ComponentFixture<AppSelectorComponent>;
  let configService: ConfigService;
  let router: Router;
  let cardsElement: DebugElement;
  // tslint:disable-next-line: no-any
  let firstConfig: any;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule,
        RouterModule.forRoot([]),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [AppSelectorComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        ConfigService,
        MsalService,
        ShieldPassiveFederationService,
        {
          provide: MSAL_CONFIG,
          useValue: '/'
        }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AppSelectorComponent);
    component = fixture.componentInstance;
    configService = TestBed.get(ConfigService);
    const csopSetting = JSON.stringify(csopData);
    configService.config = JSON.parse(csopSetting);
    const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(CoreConstants.keyLength));
    Object.defineProperty(window, 'crypto', {
      value: { getRandomValues: mGetRandomValues },
    });

    component.application = configService.config.
      csopsettings.
      applications.
      sort((a, b) => (a.renderingOrder > b.renderingOrder) ? 1 : -1);
    firstConfig = component.application[0];
    router = TestBed.get(Router);
    fixture.detectChanges();
    cardsElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read applications from csopsettings file', () => {
    expect(component.application).not.toBeNull();
  });

  it('should set appName from csopsettings file to app block', () => {
    expect(cardsElement.nativeElement.querySelector('li').textContent.trim()).toBe(firstConfig.appTitle);
  });

  it('should create app blocks for all the app from csopsettings file', () => {
    expect(cardsElement.nativeElement.querySelector('ul').children.length).toEqual(component.application.length);
  });

  it('should set app block color from csopsettings file', () => {
    expect(cardsElement.nativeElement.querySelector('li').getAttribute('style')).toBe('background-color: ' + firstConfig.appColor + ';');
  });

  it('should trigger onAppSelected from any card click', () => {
    spyOn(component, 'onAppSelected');
    const firstCard = cardsElement.nativeElement.querySelector('li');
    firstCard.click();
    expect(component.onAppSelected).toHaveBeenCalled();
  });

  it('should navigate to authentication url as per csopsettings file configuration on onAppSelected trigger', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const firstCard = cardsElement.nativeElement.querySelector('li');
    firstCard.click();

    switch (firstConfig.authenticationMechanism.name) {
      case AuthenticationType.AzureAd:
        expect(navigateSpy).toHaveBeenCalledWith(['/azureAd']);
        break;
      case AuthenticationType.Shield:
        expect(navigateSpy).toHaveBeenCalledWith(['/login']);
        break;
      case AuthenticationType.ShieldPassiveFederation:
        expect(navigateSpy).toHaveBeenCalledWith(['/shieldAuth']);
        break;
      default:
        fail('Undefined Authentication Type : ' + firstConfig.authenticationMechanism.name);
        break;
    }
  });

  it('should navigate to authentication url from csopsettings file configuration for all the apps with onAppSelected method', () => {
    const navigateSpy = spyOn(router, 'navigate').and.stub();
    component.application.forEach(function (app) {
      component.onAppSelected(app.appName);
      switch (app.authenticationMechanism.name) {
        case AuthenticationType.AzureAd:
          expect(navigateSpy.calls.mostRecent().args[0]).toEqual(['/azureAd']);
          break;
        case AuthenticationType.Shield:
          expect(navigateSpy.calls.mostRecent().args[0]).toEqual(['/login']);
          break;
        case AuthenticationType.ShieldPassiveFederation:
          spyOn(component, 'PassiveFederationRequest');
          // expect(component.PassiveFederationRequest).toHaveBeenCalled();
          break;
        default:
          fail('Undefined Authentication Type : ' + app.authenticationMechanism.name);
          break;
      }
    });

  });

});
