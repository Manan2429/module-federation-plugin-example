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
Allscripts CareQuality™ is a trademark of Allscripts Healthcare, LLC and/or its affiliates.
*
*
*/
/* P r o p r i e t a r y N o t i c e */

import { Injectable } from '@angular/core';
import { ConfigService } from 'projects/cs-lib/src/lib/services/configservice/configuration.service';

import {
  AppProfile,
  AzureUserProfile,
  Role,
  UserAccessProfile
} from '../../model';
import { CoreConstants } from '../../../../../../cs-lib/src/lib/constants';

@Injectable()
export class ProfileRoleHelper {
  // To Do : Nisarg
  public constructor(private readonly configService: ConfigService) {
  }

  public getApplicationProfiles() {
    const appProfiles = new Array<AppProfile>();
    for (const profile of this.configService.config.csopsettings.applications) {
      const appProfile = new AppProfile(
        profile.apiURLs,
        profile.appName,
        profile.appTitle,
        profile.appModulePath,
        profile.appVersion,
        profile.defaultNavigationPath,
        new Array<Role>(),
        profile.resourceId,
        profile.applicationId,
        profile.rolePrefix
      );
      appProfiles.push(appProfile);
    }
    return appProfiles;
  }

  // tslint:disable-next-line: no-any
  public getAzureUserProfiles(userProfiles: any): Array<AzureUserProfile> {
    let listAzureUserProfiles = new Array<AzureUserProfile>();
    if (userProfiles !== undefined) {
      listAzureUserProfiles = userProfiles.value;
    }
    return listAzureUserProfiles;
  }

  // public getUserAccessProfile(listAzureUserProfiles: Array<AzureUserProfile>): UserAccessProfile {
  //  const listApplication = new Array<AppProfile>();
  //  let username = '';

  //  // get list of CSOP applications from CSOP settings
  //  const listCSOPApplications = this.getListApplicationProfile();

  //  // Remove applications from Azure User Profile which are not part of CSOP
  //  const filtered = listAzureUserProfiles.filter(function (item) {
  //    // tslint:disable-next-line: strict-boolean-expressions
  //    if (listCSOPApplications.find(x => x.resourceId === item.resourceId)) {
  //      return true;
  //    }
  //  });

  //  // Get list of application for which user have rights from the list of CSOP application
  //  for (const profile of filtered) {
  //    username = profile.principalDisplayName;
  //    for (const app of listCSOPApplications) {
  //      if (app.resourceId === profile.resourceId) {
  //        app.permissions.push(new Role(profile.appRoleId, ''));
  //        listApplication.push(app);
  //        break;
  //      }
  //    }
  //  }
  //  return new UserAccessProfile(username, listApplication);
  // }

  // tslint:disable-next-line: no-any
  public getUserAccessProfile(idToken: any): UserAccessProfile {
    const listApplication = new Array<AppProfile>();
    const roles = idToken.roles;
    if (roles !== undefined && roles.length > 0) {
      // @ts-ignore
      const readRole = roles.filter(p => p.toLowerCase().includes(CoreConstants.read));

      if (readRole[0] === undefined || readRole[0] === null) {
        return new UserAccessProfile('', listApplication);
      }

      // get list of CSOP applications from CSOP settings
      const listCSOPApplications = this.getApplicationProfiles();
      for (const app of listCSOPApplications) {
        let count = 0;
        for (const role of roles) {
          if (role.startsWith(app.rolePrefix)) {
            app.permissions.push(new Role(count.toString(), role));
            count++;
          }
        }
        listApplication.push(app);
      }
    }
    // @ts-ignore
    return new UserAccessProfile(idToken.preferred_username, listApplication);
  }
  // tslint:disable-next-line: no-any
  public setRolesForAppProfile(azureApplication: any,
    appProfile: AppProfile): AppProfile {
    if (azureApplication !== undefined && azureApplication.value.length > 0) {
      const roles = azureApplication.value[0].appRoles;
      if (roles.length > 0) {
        for (const role of roles) {
          for (let i = 0; i < appProfile.permissions.length; i++) {
            if (appProfile.permissions[i].id === role.id) {
              appProfile.permissions[i].name = role.displayName;
              break;
            }
          }
        }
      }
    }
    return appProfile;
  }
}
