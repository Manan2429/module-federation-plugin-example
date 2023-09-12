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

export enum Applications {
  CareQuality = 'care-app',
  HubRegistry = 'hub-registry',
  FoD = 'fod-app',
  Sop = 'sop-app',
  HubPPTX = 'hub-pptx',
  HubPDMP = 'hub-pdmp',
  HubEnrollment = 'hub-enrollment',
  BAM = 'bam-app'
}
export const ApplicationNames = new Map<Applications, string>([
  [Applications.CareQuality, 'CareQuality Management Portal'],
  [Applications.HubRegistry, 'Hub Registry'],
  [Applications.FoD, 'Formulary On Demand'],
  [Applications.Sop, 'Shield Operational Portal'],
  [Applications.HubPPTX, 'Hub Portal'],
  [Applications.HubPDMP, 'Prescription Drug Monitoring Program'],
  [Applications.HubEnrollment, 'Hub Enrollment Portal'],
  [Applications.BAM, 'BAM Portal']
]);

export const CoreConstants = {
  cal: 'cal',
  confirmationMessage: 'Your session is about to expire!',
  cqAuthToken: Applications.CareQuality + '-AuthToken',
  cqitoken: Applications.CareQuality + '-itoken',
  cqRoles: Applications.CareQuality + '-roles',
  cqUserName: Applications.CareQuality + '-userNAme',
  dlgBtnCancel: 'Stay here',
  dlgBtnNo: 'No',
  dlgBtnSaveContinue: 'Save Changes and Continue',
  dlgBtnYes: 'Yes',
  dlgTitleConfirmation: 'Confirmation',
  email: 'email',
  empty: '',
  enrollmentApi: '',
  enrollAuthToken: Applications.HubEnrollment + '-JwtAuthToken',
  enrollRoles: Applications.HubEnrollment + '-roles',
  enrollUserName: Applications.HubEnrollment + '-userName',
  fodAuthToken: Applications.FoD + '-SamlAuthToken',
  foditoken: Applications.FoD + '-itoken',
  fodRoles: Applications.FoD + '-roles',
  fodUserName: Applications.FoD + '-userName',
  health: 'health',
  hrAuthToken: Applications.HubRegistry + '-JwtAuthToken',
  hritoken: Applications.HubRegistry + '-itoken',
  hrRoles: Applications.HubRegistry + '-roles',
  hrUserName: Applications.HubRegistry + '-userName',
  pdmpAuthToken: Applications.HubPDMP + '-JwtAuthToken',
  pdmpCALSamlToken: Applications.HubPDMP + '-cal-SamlAuthToken',
  pdmpitoken: Applications.HubPDMP + '-itoken',
  pdmpRoles: Applications.HubPDMP + '-roles',
  pdmpUserName: Applications.HubPDMP + '-userName',
  pptxAuthToken: Applications.HubPPTX + '-JwtAuthToken',
  pptxitoken: Applications.HubPPTX + '-itoken',
  pptxCALSamlToken: Applications.HubPPTX + '-cal-SamlAuthToken',
  pptxHealthToken: Applications.HubPPTX + '-health-SamlAuthToken',
  pptxHealthTokenProfile: Applications.HubPPTX + '-health-Token-Profile',
  pptxRoles: Applications.HubPPTX + '-roles',
  pptxUserName: Applications.HubPPTX + '-userName',
  isUserLoggedIn: 'IsUserLoggedIn',
  JwtAuthToken: 'JwtAuthToken',
  keyLength: 10,
  notAuthorizedMsg: 'You are not authorized to view Care Quality.',
  read: 'read',
  SamlAuthToken: 'SamlAuthToken',
  shieldSettingsUrl: '../assets/shieldsettings.json',
  sleepTimeMs: 5000,
  defaultAuthenticationSetting: 'default',
  pptxTokenInfo: Applications.HubPPTX + '-tokenInfo',
  pdmpTokenInfo: Applications.HubPDMP + '-tokenInfo',
  enrollmentTokenInfo: Applications.HubEnrollment + '-tokenInfo',
  bamTokenInfo: Applications.BAM + '-tokenInfo',
  bamCALSamlToken: Applications.BAM + '-cal-SamlAuthToken',
  tokenInfo: 'tokenInfo',
  roles: '-roles',
  sopUserRoles: 'sopUserRoles',
  userLoginId : 'userloginid'
};

export enum AuthScope {
  /// <summary>
  /// The unscope
  /// </summary>
  Unscope = 'Unscope',

  /// <summary>
  /// The tenant
  /// </summary>
  Tenant = 'Tenant',

  /// <summary>
  /// The application instance
  /// </summary>
  AppInstance = 'AppInstance',
}
