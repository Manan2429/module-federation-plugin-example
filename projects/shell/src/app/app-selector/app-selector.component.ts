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

/** Exports the AppSelector Component */

import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationType, ConfigService, Constants, IAppSettings, StorageService } from 'projects/cs-lib/src/public-api';
// import { IAppSettings } from 'projects/csop-lib/src/public-api';
// import { ConfigService } from '../../../../csop-lib/src/public-api';

// import {
//   Applications,
//   CoreConstants
// } from '../core/constants';
import { SharedFunctions } from '../core/model/helpers/shared-functions';
import { Applications, CoreConstants } from 'projects/cs-lib/src/lib/constants';
import { filter } from 'rxjs';
// import { StorageService } from '../core/services';
// import {
//   IAppSettings,
//   Constants,
//   AuthenticationType,
// } from '../../../projects/csop-lib/src/public-api';
// import { ConfigService } from '../../../projects/csop-lib/src/lib/services/configservice/configuration.service';

@Component({
  selector: 'app-selector-cmp',
  templateUrl: 'app-selector.component.html',
  styleUrls: ['app-selector.component.css']
})

export class AppSelectorComponent implements OnInit {
  // public properties
  public application: Array<IAppSettings> = [];
  // tslint:disable-next-line:no-any no-uninitialized
  @ViewChild('divIDP', { static: true }) public divIDP: any;
  public version: string | undefined;

  // public methods
  public constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly storage: StorageService,
    private readonly configService: ConfigService,
    private readonly http: HttpClient
  ) 

  {
    // tslint:disable-next-line:no-any
    this.fetchAppVersion().subscribe((data: any) => {
      this.version = data.version;
    });
  }
  

  public fetchAppVersion() {
    return this.http.get('/assets/config.json', { responseType: 'json' });
  }

  public ngOnInit() {
    if (!this.storage.getKey('ukey')) { // tslint:disable-line:strict-boolean-expressions
      this.storage.storeKey(JSON.stringify(SharedFunctions.makeRandomString(CoreConstants.keyLength)));
    }
    this.configService.loadUrl('./assets/csopsettings.json');
    this.application = this.configService.config.
      csopsettings.
      applications.
      sort((a, b) => (a.renderingOrder > b.renderingOrder) ? 1 : -1);

    this.route.queryParams
      .pipe(filter(params => params.app))
      .subscribe(params => {
        // keep it intentionally, will remove once verified the workflow in build
        console.log('default app [app selector]:' + params.app);
        if (params.app !== null
          && params.app !== undefined
          && params.app === Applications.CareQuality) {
          this.onAppSelected(params.app);
        }
      });
  }

  public onAppSelected(app: string) {
    console.log(app);    
    this.storage.setItem(Constants.app, app);
    const selectedApp = this.configService.config.csopsettings.applications.find(x => x.appName === app);
    if (selectedApp !== undefined) {
      switch (selectedApp.authenticationMechanism.name) {
        case AuthenticationType.AzureAd:
          this.router.navigate(['/azureAd']);
          break;
        case AuthenticationType.Shield:
          this.router.navigate(['/login']);
          break;
        case AuthenticationType.ShieldPassiveFederation:
          this.router.navigate(['/loginPassiveFederation']);
          break;
        default: break;
      }
    }
  }
}
