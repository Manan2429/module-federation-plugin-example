/* P r o p r i e t a r y N o t i c e */
/* Unpublished � 2021 Allscripts Healthcare, LLC and/or its affiliates. All Rights
Reserved.
*
* P r o p r i e t a r y N o t i c e: This software has been provided pursuant to a License Agreement, with Allscripts
Healthcare, LLC and/or its affiliates, containing restrictions on its use. This software contains valuable trade secrets
and proprietary information of Allscripts Healthcare, LLC and/or its affiliates and is protected by trade secret and
copyright law. This software may not be copied or distributed in any form or medium, disclosed to any third parties,
or used in any manner not provided for in said License Agreement except with prior written authorization from
Allscripts Healthcare, LLC and/or its affiliates. Notice to U.S. Government Users: This software is �Commercial
Computer Software.�
Allscripts Common Services Operations Portal is a trademark of Allscripts Healthcare, LLC and/or its affiliates.
*
*
*/
/* P r o p r i e t a r y N o t i c e */

import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import {
  LoginUserProfile,
  Permission,
  UserRole,
} from '../../public-api';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private readonly keyName = '-userProfile';
  public constructor(private readonly storageService: StorageService) {

  }

  public checkPermissions(appName: string, profileName: string, permissionName: string): boolean {

    const loginUserProfile = this.getUserProfile(appName, profileName);
    if (loginUserProfile !== undefined) {
      return loginUserProfile.permissions.find((item: Permission) => item.value === permissionName) !== undefined;
    }
    return false;
  }

  public checkRole(appName: string, profileName: string, rolename: string): boolean {
    const loginUserProfile = this.getUserProfile(appName, profileName);
    if (loginUserProfile !== undefined) {
      return loginUserProfile.roles.find((item: UserRole) => item.roleName === rolename) !== undefined;
    }
    return false;
  }

  public getUserProfile(appName: string, profileFor: string): LoginUserProfile | undefined {

    const value = this.storageService.getItem(appName + '-' + profileFor + this.keyName);

    if (value !== undefined && value !== '' && value !== null) {
      const loginUserProfile: LoginUserProfile = JSON.parse(value);
      return loginUserProfile;
    }
    return undefined;
  }

  public saveUserProfile(appName: string, profileFor: string, userProfile: LoginUserProfile) {
    this.storageService.setItem(appName + '-' + profileFor + this.keyName, JSON.stringify(userProfile));
  }
}
