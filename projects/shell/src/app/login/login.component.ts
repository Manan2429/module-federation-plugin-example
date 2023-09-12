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

/** Exports the Login Component */

import {
  Component,
  OnInit
} from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  Router
} from '@angular/router';

// import {
//   Applications,
//   CoreConstants,
// } from '../core/constants';
// import {
//   StorageService
// } from '../core/services';
import { SharedFunctions } from '../core/model/helpers';
import { LoginResponse } from '../core/model';
import {
  IAppSettings,
  Validations,
  Constants,
  StorageService,
} from '../../../../cs-lib/src/public-api';
import { GenericDataService } from '../../../../cs-lib/src/lib/dataservice/generic-data.service.';
import { LoginService } from '../../../../cs-lib/src/lib/loginservices/login.service';
import { ConfigService } from '../../../../cs-lib/src/lib/services/configservice/configuration.service';
import { Applications, CoreConstants } from 'projects/cs-lib/src/lib/constants';

@Component({
  selector: 'app-login-cmp',
  templateUrl: 'login.component.html',
  providers: [Location],
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  // public properties
  public applications: IAppSettings[];
  public appTitle = '';
  public busy = false;
  public environmentList: Array<string> = [];
  public errorMessage = '';
  public loading = false;
  public progressBarId = 'loginProgressbar';
  public pwd = '';
  public pwdLabel = 'Password';
  public selectedEnvironment = '';
  public showEnvrionmentDropdown = false;
  public showError = false;
  public uName = '';
  public uNameLabel = 'User Name';

  // private properties
  private app = '';
  // public methods
  public constructor(
    private readonly configService: ConfigService,
    private readonly loginService: LoginService,
    private readonly dataService: GenericDataService,
    private readonly storage: StorageService,
    private readonly router: Router
  ) {
    this.applications = this.configService.config.csopsettings.applications;
  }

  public ngOnInit() {
    this.appTitle = this.setApplicationTitle(this.applications);
  }

  /**
   * Use this function to handle the User Login
   */
  public userLogin() {
    this.loading = true;
    this.showError = false;
    if (!this.uName) { // tslint:disable-line:strict-boolean-expressions
      this.showErrorMessage(this.uNameLabel + ' is required');
    } else if (!this.pwd) { // tslint:disable-line:strict-boolean-expressions
      this.showErrorMessage(this.pwdLabel + ' is required');
    } else {
      if (!this.storage.getKey('ukey')) { // tslint:disable-line:strict-boolean-expressions
        this.storage.storeKey(JSON.stringify(SharedFunctions.makeRandomString(CoreConstants.keyLength)));

      }
      this.storage.setItem(this.app + '-userName', this.uName);
      this.dataService.showHideProgressBar(true, this.progressBarId);
      // this.loginService.login(this.uName, this.pwd).subscribe(
      //   (response: any) => { // tslint:disable-line:no-any
      //     if (response instanceof LoginResponse) {
      //       this.dataService.showHideProgressBar(false, this.progressBarId);
      //       this.applicationRedirect(response);
      //     } else {
      //       response.subscribe(
      //         (loginResponse$: LoginResponse) => {
      //           this.dataService.showHideProgressBar(false, this.progressBarId);
      //           this.applicationRedirect(loginResponse$);
      //         },
      //         () => {
      //           this.dataService.showHideProgressBar(false, this.progressBarId);
      //           this.showErrorMessage(Validations.loginFailed);
      //         }
      //       );
      //     }
      //   },
      //   () => {
      //     this.dataService.showHideProgressBar(false, this.progressBarId);
      //     this.showErrorMessage(Validations.loginFailed);
      //   }
      // );
    }
  }

  private applicationRedirect(response: LoginResponse) {
    if (response.loginAllowed) {
      switch (this.app) {
        case Applications.HubRegistry:
        case Applications.FoD:
        case Applications.HubPPTX:
        case Applications.HubPDMP:
        case Applications.HubEnrollment:
        case Applications.BAM:
          this.router.navigate(['/shieldAuth']);
          break;
        default:
          this.showErrorMessage(Validations.appNotSupported);
          break;
      }
    } else {
      this.showErrorMessage(response.validation);
    }
  }

  private setApplicationTitle(applications: IAppSettings[]): string {
    this.app = this.storage.getItem(Constants.app);
    const selectedApp = applications.filter((app: IAppSettings) => app.appName === this.app);
    if (selectedApp.length > 0) {
      return selectedApp[0].appTitle;
    }
    return Constants.empty;
  }

  private showErrorMessage(err: string) {
    if (err !== undefined && err !== CoreConstants.empty) { // tslint:disable-line:strict-type-predicates
      this.showError = true;
      this.errorMessage = err;
    }
  }
}
