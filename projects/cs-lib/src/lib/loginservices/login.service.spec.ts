// /* P r o p r i e t a r y N o t i c e */
// /* Unpublished © 2020 Allscripts Healthcare, LLC and/or its affiliates. All Rights
// Reserved.
// *
// * P r o p r i e t a r y N o t i c e: This software has been provided pursuant to a License Agreement, with Allscripts
// Healthcare, LLC and/or its affiliates, containing restrictions on its use. This software contains valuable trade secrets
// and proprietary information of Allscripts Healthcare, LLC and/or its affiliates and is protected by trade secret and
// copyright law. This software may not be copied or distributed in any form or medium, disclosed to any third parties,
// or used in any manner not provided for in said License Agreement except with prior written authorization from
// Allscripts Healthcare, LLC and/or its affiliates. Notice to U.S. Government Users: This software is “Commercial
// Computer Software.”
// Allscripts Common Services Operations Portal is a trademark of Allscripts Healthcare, LLC and/or its affiliates.
// *
// *
// */
// /* P r o p r i e t a r y N o t i c e */
// import {
//   TestBed,
//   async,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import {
//   Constants,
//   ISetting,
//   LoginUserProfile,
//   Validations
// } from 'projects/cs-lib/src/public-api';
// import {
//   Applications,
//   CoreConstants
// } from 'src/app/core/constants';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/of';
// import { LoginResponse } from 'src/app/core/model/login-response.model';

// import { LoginService } from './login.service';
// import { ConfigService } from '../configuration.service';
// // import { StorageService } from '../../../../../../src/app/core/services/storage.service';
// import * as csopData from '../../../../../../csopsettings.json';
// // import { AuthenticationType } from '../../types/enum/authentication-type.enum';
// import { CsopLibSharedFunctions } from '../../../public-api';

// describe('Login Service', () => {

//   const mockStorageService = new StorageService();
//   // tslint:disable-next-line:no-uninitialized
//   let loginService: LoginService;
//   // tslint:disable-next-line:no-uninitialized
//   let httpMock: HttpTestingController;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule(
//       {
//         imports: [
//           HttpClientTestingModule,
//         ],
//         providers: [
//           StorageService,
//           LoginService,
//           ConfigService
//         ]
//       });

//     httpMock = TestBed.get(HttpTestingController);
//     loginService = TestBed.get(LoginService);
//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings = csopData;
//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings.applications = csopData.csopsettings.applications;
//   }));

//   // tslint:disable-next-line:no-any
//   function getLoginResponse(): LoginUserProfile {

//     let validTo = new Date();
//     // tslint:disable-next-line:no-magic-numbers
//     validTo = new Date(validTo.setMinutes(18));
//     /** Shield Login response */
//     const loginResponse: LoginUserProfile = {

//       userId: '6e5d3eb0-2398-481e-becb-9743c05d0c61',
//       userName: 'HubAdminUser',
//       firstName: 'HubAdminUser',
//       lastName: 'HubAdminUser',
//       email: 'gaurav.patel@allscripts.com',
//       tokenInfo: {
//         jwtToken: 'jwtToken Test',
//         samlToken: 'samlToken Test',
//         validTo: validTo
//       },
//       roles: [
//         { roleName: 'EnrollmentAdmin', roleDescription: 'EnrollmentAdmin' },
//         { roleName: 'EnrollmentSuperUser', roleDescription: 'EnrollmentSuperUser' },
//         { roleName: 'HubAdmin', roleDescription: 'HubAdmin' },
//         { roleName: 'OperationsRegistriesSuperUser', roleDescription: 'OperationsRegistriesSuperUser' },
//         { roleName: 'OperationsRegistriesViewer', roleDescription: 'OperationsRegistriesViewer' },
//         { roleName: 'PDMPSuperUser', roleDescription: 'PDMPSuperUser' },
//         { roleName: 'PPTxViewer', roleDescription: 'PPTxViewer' },
//         { roleName: 'SIGToolViewer', roleDescription: 'SIGToolViewer' }],
//       permissions: [
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubAccountEditCreate', value: 'HubAccountEditCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubAccountViewer', value: 'HubAccountViewer' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubAppEditCreate', value: 'HubAppEditCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubAppViewer', value: 'HubAppViewer' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubDemographicsEditCreate', value: 'HubDemographicsEditCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubDemographicsViewer', value: 'HubDemographicsViewer' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubEndPointEditCreate', value: 'HubEndPointEditCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubEndPointViewer', value: 'HubEndPointViewer' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubEnrollUnEnrollEditCreate', value: 'HubEnrollUnEnrollEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubEnrollUnEnrollViewer', value: 'HubEnrollUnEnrollViewer' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubEnrollUpdateCrossReference', value: 'HubEnrollUpdateCrossReference' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubLocationEditCreate', value: 'HubLocationEditCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubLocationViewer', value: 'HubLocationViewer' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-Batch-Search', value: 'HubOperations-Batch-Search' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-HL7ConfigurationDelete', value: 'HubOperations-HL7ConfigurationDelete' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-HL7ConfigurationEditCreate', value: 'HubOperations-HL7ConfigurationEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-HL7ConfigurationView', value: 'HubOperations-HL7ConfigurationView' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-IHETransTypesDelete', value: 'HubOperations-IHETransTypesDelete' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-IHETransTypesEditCreate', value: 'HubOperations-IHETransTypesEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-IHETransTypesView', value: 'HubOperations-IHETransTypesView' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-JobsDelete', value: 'HubOperations-JobsDelete' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-JobsEditCreate', value: 'HubOperations-JobsEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-JobsView', value: 'HubOperations-JobsView' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-MacrosDelete', value: 'HubOperations-MacrosDelete' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-MacrosEditCreate', value: 'HubOperations-MacrosEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-MacrosView', value: 'HubOperations-MacrosView' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-RegistriesEditCreate', value: 'HubOperations-RegistriesEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-Registries-MessageContentView', value: 'HubOperations-Registries-MessageContentView' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-Registries-RemoveBatchMessage', value: 'HubOperations-Registries-RemoveBatchMessage' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-Registries-Search', value: 'HubOperations-Registries-Search' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-Registries-UpdateBatchStatus', value: 'HubOperations-Registries-UpdateBatchStatus' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-RulesDelete', value: 'HubOperations-RulesDelete' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-RulesEditCreate', value: 'HubOperations-RulesEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-RulesView', value: 'HubOperations-RulesView' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-ValuesToEncryptDelete', value: 'HubOperations-ValuesToEncryptDelete' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-ValuesToEncryptEditCreate', value: 'HubOperations-ValuesToEncryptEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubOperations-ValuesToEncryptView', value: 'HubOperations-ValuesToEncryptView' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubPartnerEditCreate', value: 'HubPartnerEditCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubPartnerViewer', value: 'HubPartnerViewer' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubPrescriberAccountEditCreate', value: 'HubPrescriberAccountEditCreate' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubServiceGroupEditCreate', value: 'HubServiceGroupEditCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubServiceGroupViewer', value: 'HubServiceGroupViewer' },
//         // tslint:disable-next-line:max-line-length
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubServiceLevelEditCreate', value: 'HubServiceLevelEditCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/HubServiceLevelViewer', value: 'HubServiceLevelViewer' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/PDMPCALViewer', value: 'PDMPCALViewer' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/PDMPViewer', value: 'PDMPViewer' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/PPTxCALViewer', value: 'PPTxCALViewer' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/PPTxViewer', value: 'PPTxViewer' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/SIG-PreferredEdit', value: 'SIG-PreferredEdit' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/SIG-PreferredView', value: 'SIG-PreferredView' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/SIG-SimpleCreate', value: 'SIG-SimpleCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/SIG-SimpleEdit', value: 'SIG-SimpleEdit' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/SIG-SimpleView', value: 'SIG-SimpleView' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/SIG-StructuredCreate', value: 'SIG-StructuredCreate' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/SIG-StructuredEdit', value: 'SIG-StructuredEdit' },
//         { uri: 'http://schema.allscripts.com/Hub/ManagementConsole/Permissions/SIG-StructuredView', value: 'SIG-StructuredView' }]
//     };

//     return loginResponse;
//   }

//   it('should create LoginService', () => {
//     expect(loginService).toBeTruthy();
//   });

//   it('should return ture if email id is not exist into storage', () => {

//     const emailid = 'gaurav.patel@allscripts.com';

//     const result: boolean = loginService.verifyEmail(emailid);
//     expect(result).toEqual(true);
//     const storedEmailid = mockStorageService.getItem('email');
//     expect(storedEmailid).toEqual(emailid);
//   });

//   it('should return ture if user email id is match with existing login user', () => {

//     const emailid = 'gaurav.patel@allscripts.com';

//     let result: boolean = loginService.verifyEmail(emailid);
//     expect(result).toEqual(true);
//     let storedEmailid = mockStorageService.getItem('email');
//     expect(storedEmailid).toEqual(emailid);

//     result = loginService.verifyEmail(emailid);
//     expect(result).toEqual(true);

//     storedEmailid = mockStorageService.getItem('email');
//     expect(storedEmailid).toEqual(emailid);

//   });

//   it('should return false if user email id is not match exist login user', () => {

//     const emailid = 'gaurav.patel@allscripts.com';
//     mockStorageService.setItem('email', 'test@test.com');

//     const result: boolean = loginService.verifyEmail(emailid);
//     expect(result).toEqual(false);

//     const storedEmailid = mockStorageService.getItem('email');
//     expect(storedEmailid).not.toBe(emailid);

//   });

//   it('should login user successfully', fakeAsync(() => {
//     mockStorageService.setItem(CoreConstants.email, 'gaurav.patel@allscripts.com');
//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings = csopData;
//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings.applications = csopData.csopsettings.applications;
//     // tslint:disable-next-line:no-any
//     (loginService as any).authProvider = csopData.csopsettings.
//       authProviders.filter((provider) => provider.name === AuthenticationType.Shield)[0];
//     // tslint:disable-next-line:no-any
//     const loginURL = (loginService as any).authProvider.endPoint + 'api/authentication/login/';
//     const loginUser = getLoginResponse();

//     const apps = csopData.csopsettings.applications.filter((app) => app.authenticationMechanism.name === AuthenticationType.Shield);

//     apps.forEach((app) => {
//       mockStorageService.setItem(Constants.app, app.appName);

//       loginService.login('test', 'test').subscribe(
//         // tslint:disable-next-line:no-empty
//         () => { }
//       );

//       const req = httpMock.expectOne(loginURL);

//       expect(req.request.url).toEqual(loginURL);
//       expect(req.request.method).toEqual('POST');

//       req.flush(loginUser);
//       tick();
//     });
//   }));

//   it('should set user full name and role on login user successfully', fakeAsync(() => {
//     const loginUser = getLoginResponse();

//     const apps = csopData.csopsettings.applications.filter((app) => app.authenticationMechanism.name === AuthenticationType.Shield);

//     apps.forEach((app) => {
//       mockStorageService.setItem(Constants.app, app.appName);
//       const appFromStorage = mockStorageService.getItem(Constants.app);

//       const response = loginService.setUserRoles(loginUser, appFromStorage);

//       expect(response.loginAllowed).toBe(true);
//       expect(response.validation).toBe('');

//       expect(mockStorageService.getItem('fullName')).toEqual(loginUser.lastName + ',' + loginUser.firstName);
//       const permissions: string[] = JSON.parse(mockStorageService.getItem(appFromStorage + '-roles'));
//       expect(permissions.length).toEqual(loginUser.permissions.length);
//     });

//   }));

//   it('should return error message and clear storage if login user emailId is different from already login user', fakeAsync(() => {
//     mockStorageService.setItem(Constants.app, Applications.HubRegistry);
//     mockStorageService.setItem('email', 'test@test.com');

//     const loginUser = getLoginResponse();

//     const appFromStorage = mockStorageService.getItem(Constants.app);
//     const response = loginService.setUserRoles(loginUser, appFromStorage);

//     expect(response.loginAllowed).toBe(false);
//     expect(response.validation).toBe(Validations.accessDenied);

//     // ** Verify storage clear */

//     expect(mockStorageService.getItem('email')).toEqual('');
//     expect(mockStorageService.getItem(appFromStorage)).toEqual('');

//   }));

//   it('should save token info into storage on successful login', fakeAsync(() => {

//     mockStorageService.setItem('email', 'test@test.com');
//     const loginUser = getLoginResponse();

//     // tslint:disable-next-line:no-any
//     spyOn<any>(loginService, 'setRefreshTokenTimer');

//     const apps = csopData.csopsettings.applications.filter((app) => app.authenticationMechanism.name === AuthenticationType.Shield);

//     apps.forEach((app) => {
//       mockStorageService.setItem(Constants.app, app.appName);
//       const appFromStorage = mockStorageService.getItem(Constants.app);

//       loginService['saveTokens'](loginUser, app.appName);

//       // tslint:disable-next-line:no-any
//       expect((loginService as any).setRefreshTokenTimer).toHaveBeenCalled();
//       expect(mockStorageService.getItem(appFromStorage + '-' + CoreConstants.JwtAuthToken)).toEqual(loginUser.tokenInfo.jwtToken);
//       expect(mockStorageService.getItem(appFromStorage + '-' + CoreConstants.SamlAuthToken)).toEqual(loginUser.tokenInfo.samlToken);
//       tick();
//     });
//   }));

//   it('should set SamlAuthToken RefreshToken on successful login', fakeAsync(() => {

//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings = csopData;
//     mockStorageService.setItem(CoreConstants.email, 'gaurav.patel@allscripts.com');

//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings.applications = csopData.csopsettings.applications;

//     // tslint:disable-next-line:no-any
//     (loginService as any).authProvider = csopData.csopsettings.
//       authProviders.filter((provider) => provider.name === AuthenticationType.Shield)[0];

//     // tslint:disable-next-line:no-any
//     spyOn<any>(loginService, 'setRefreshTokenTimer');

//     // tslint:disable-next-line:no-any
//     const refreshURL = (loginService as any).authProvider.endPoint + 'api/authentication/refresh/';
//     const apps = csopData.csopsettings.applications.filter((app) => app.authenticationMechanism.name === AuthenticationType.Shield);

//     // tslint:disable-next-line:no-any
//     const saveTokenSpy = spyOn<any>(loginService, 'saveTokens');

//     apps.forEach((app) => {
//       const loginUser = getLoginResponse();
//       mockStorageService.setItem(Constants.app, app.appName);
//       const appFromStorage = mockStorageService.getItem(Constants.app);

//       console.log(app.appName);

//       mockStorageService.setItem(appFromStorage + '-' + CoreConstants.SamlAuthToken,
//         loginUser.tokenInfo.samlToken);

//       // tslint:disable-next-line:no-any
//       (loginService as any).setApplicationScopeObject(appFromStorage);

//       loginService.getRefreshToken(appFromStorage, appFromStorage).subscribe(
//         // tslint:disable-next-line:no-empty
//         () => {
//           // Update Token value for verification
//           loginUser.tokenInfo.samlToken = loginUser.tokenInfo.samlToken + ' Refresh Token';

//           saveTokenSpy.and.callFake((profile: LoginUserProfile = loginUser, appName: string = app.appName) => {
//             mockStorageService.setItem(appName + '-' + CoreConstants.JwtAuthToken, profile.tokenInfo.jwtToken);
//             mockStorageService.setItem(appName + '-' + CoreConstants.SamlAuthToken, profile.tokenInfo.samlToken);
//           });

//           loginService['saveTokens'](loginUser, appFromStorage);

//         }
//       );

//       const req = httpMock.expectOne(refreshURL);

//       const requestBody = {
//         AuthToken: loginUser.tokenInfo.samlToken,
//         // tslint:disable-next-line:no-any
//         Scope: (loginService as any).scope,
//         IssueCompressToken: true
//       };

//       req.flush(loginUser);
//       tick();

//       expect(req.request.url).toEqual(refreshURL);
//       expect(req.request.method).toEqual('POST');
//       expect(req.request.body).toEqual(JSON.stringify(requestBody));

//       // expect((loginService as any).setRefreshTokenTimer).toHaveBeenCalled();
//       // expect(mockStorageService.getItem(appFromStorage + '-' + CoreConstants.SamlAuthToken)).
//       //   toEqual(loginUser.tokenInfo.samlToken);

//     });

//   }));

//   it('should set valid authentication scope for application', fakeAsync(() => {

//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings = csopData;
//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings.applications = csopData.csopsettings.applications;

//     const apps = csopData.csopsettings.applications.filter((app) => app.authenticationMechanism.name === AuthenticationType.Shield);

//     apps.forEach((app) => {
//       mockStorageService.setItem(Constants.app, app.appName);
//       const appFromStorage = mockStorageService.getItem(Constants.app);

//       // tslint:disable-next-line:no-any
//       (loginService as any).setApplicationScopeObject(appFromStorage);

//       console.log(app.authenticationMechanism);

//       const scopeValues = CsopLibSharedFunctions.getAuthenticationSettingScopeValue(
//         (app.authenticationMechanism.setting as ISetting[]), Constants.defaultAuthenticationSettingName);

//       if (scopeValues !== undefined) {
//         const requestBody = {
//           relyingParty: scopeValues.relyingParty,
//           scope: scopeValues.scope,
//           scopeValue: scopeValues.scopeValue,
//           issueCompressToken: scopeValues.issueCompressToken
//         };

//         // tslint:disable-next-line:no-any
//         expect((loginService as any).scope).toEqual(requestBody);
//       } else {
//         expect(true).toBe(false);
//       }
//     });

//   }));

//   it('should call setUserData on successfull login', fakeAsync(() => {
//     const loginUser = getLoginResponse();
//     // tslint:disable-next-line:no-any
//     (loginService as any).csopSettings = csopData;

//     spyOn(loginService, 'setUserRoles').and.returnValue(new LoginResponse(true, ''));
//     // tslint:disable-next-line:no-any
//     spyOn<any>(loginService, 'saveTokens');

//     const apps = csopData.csopsettings.applications.filter((app) => app.authenticationMechanism.name === AuthenticationType.Shield);

//     apps.forEach((app) => {
//       mockStorageService.setItem(Constants.app, app.appName);
//       const appFromStorage = mockStorageService.getItem(Constants.app);

//       const response = loginService['setUserData'](loginUser, appFromStorage);

//       tick();
//       expect(response.loginAllowed).toEqual(true);
//       expect(response.validation).toEqual('');
//       expect(loginService.setUserRoles).toHaveBeenCalled();
//       // tslint:disable-next-line:no-any
//       expect((loginService as any).saveTokens).toHaveBeenCalled();
//     });

//   }));
// });
