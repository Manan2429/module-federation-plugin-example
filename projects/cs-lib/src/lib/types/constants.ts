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
Allscripts Common Services Operations Portal { is a trademark of Allscripts Healthcare, LLC and/or its affiliates.
*
*
*/
/* P r o p r i e t a r y N o t i c e */

/**
 * This barrel file provides the export for the shared Enums, Interfaces and Models
*/
export const Constants = {
  apiJwks: 'Jwks',
  connection: 'Connection',
  empty: '',
  issueSAMLRequest: 'IssueSAMLRequest',
  getUserAuthenticationDetails: 'GetUserAuthenticationDetails',
  checkIdentityAccessDetails: 'CheckIdentityAccessDetails',
  removeUserDetails: 'RemoveUserDetails',
  hub: 'csopsessionmanagement',
  invalidEmailId: 'Provided EmailId is not a valid format',
  newLine: '<br/>',
  shieldPassiveFederation: 'ShieldPassiveFederation',
  sessionWarning: 'Concurrent Session Warning',
  sessionWarningMessage: 'Concurrent login occured for the same user, terminating the current session.',
  signalR: 'SignalRConnection',
  app: 'app',
  unauthorized: 'You are not authorized to perform this operation',
  defaultEndPointProviderName: 'default',
  GreaterDate: 'Greater',
  SmallerDate: 'Smaller',
  EqualsDate: 'Equals',
  inactivityTimeout: 10,
  DefaultSOPBrowserSessionTimeout: -10,
  DefaultSessionSchedulerTime: -1,
  MaxTimerLimit: 58,
  MaxSessionCounterLimit: 100,
  Seconds: 60,
  MilliSeconds: 1000,
  defaultAuthenticationSettingName: 'default',
  sessionTime: 'SessionTime',
  defaultUserProfile: 'default',
};

export const AlertConstants = {
  alertMessageResolveSlotId: 'message-to-resolve'
};

export const Validations = {
  loginFailed: 'Login Failed',
  refreshToken: 'Cannot Refresh Token',
  appNotSupported: 'Application not supported',
  accessDenied: 'Access Denied',
  unAuthorized: 'You are not authorized to access ',
  shieldSettings: 'Shield Settings are not available',
};

export const Key = {
  backspace: 'Backspace',
  control: 'Control',
  delete: 'Delete',
  end: 'End',
  home: 'Home',
  leftArrow: 'ArrowLeft',
  rightArrow: 'ArrowRight',
  shift: 'Shift',
  tab: 'Tab'
};

export const environment = {
  standalone: true
};
