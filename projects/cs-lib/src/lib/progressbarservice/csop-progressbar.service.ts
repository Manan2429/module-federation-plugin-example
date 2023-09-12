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
  Injectable,
  
} from '@angular/core';
import {
  NgElement,
  WithProperties
} from '@angular/elements';
import {
  CsopProgressbarComponent,
  ICsopProgressBar
} from 'projects/cs-lib/src/public-api';

import { CsopProgressBarType } from '../types/enum/csop-progressbar-type.enum';
import { CsopProgressBarSize } from '../types/enum/csop-progressbar-size.enum';

@Injectable({
  providedIn: 'root'
})
export class CsopProgressBarService {

  public showHide(progressBarData: ICsopProgressBar) {
    // get placeholder element
    const containerElement = document.getElementById(progressBarData.progressbarComponentId);

    if (containerElement !== null) {
      const progressBarNode = containerElement.getElementsByTagName('asg-progressbar');

      if (progressBarNode.length > 0) {
        const progressbarEl: NgElement & WithProperties<CsopProgressbarComponent>
          = progressBarNode[0] as
          NgElement & WithProperties<CsopProgressbarComponent>;
        progressbarEl.data = progressBarData;
      } else {
        // Create element
        const progressbarEl: NgElement & WithProperties<CsopProgressbarComponent>
          = document.createElement('asg-progressbar') as
          NgElement & WithProperties<CsopProgressbarComponent>;

        // assign progress bar data
        progressbarEl.data = progressBarData;

        // Add to the DOM
        containerElement.appendChild(progressbarEl);
      }
    } else {
      // To-do central logging component
    }
  }

  /**
    * Show/Hide Busy Indicator
    */
  public showHideProgressBar(
    show: boolean,
    busyIndicatorPlaceholderId: string,
    wholePage: boolean = true,
    showPercentLabel: boolean = false,
    message: string = ''
  ) {
    const progressBar: ICsopProgressBar = {
      // isModal: false,
      message: message,
      progressbarComponentId: busyIndicatorPlaceholderId,
      progType: CsopProgressBarType.Indeterminate,
      showPercentLabel: showPercentLabel,
      // spinnerSize: CsopProgressBarSize.Normal,
      visible: show,
      // wholePage: wholePage
    };
    this.showHide(progressBar);
  }
}
