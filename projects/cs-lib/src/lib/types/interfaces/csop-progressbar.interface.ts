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

import { CsopProgressBarSize } from '../enum/csop-progressbar-size.enum';
import { CsopProgressBarType } from '../enum/csop-progressbar-type.enum';

export interface ICsopProgressBar {
  // set to true to prevent any user screen interaction while the progress is visible.
  // There will be a subtle visual darkening of the screen for modal progress.
  // isModal: boolean;
  // an optional message that will be display adjacent to the progress bar or spinner
  message: string;
  // progressbar component placeholder where progressbar should be displayed.
  progressbarComponentId: string;
  // the maximum value that the progressRawValue can/will be. use in conjunction with progressRawValue
  progressRawMax?: number;
  // this value, combined with progressRawMax will be used to calculate the progress.
  progressRawValue?: number;
  // specify the value for the progress bar in percent.
  // This property and progressRawValue / progressRawMax are mutually exclusive: you only use one or the other.
  progressValuePercent?: number;
  // width in pixels of the progress bar
  progressWidth?: number;
  // can be either 'indeterminate' or 'determinate'. 'indeterminate' will display a spinner.
  // 'determinate' will display a progress bar, and you provide the values, using the properties described below.
  progType: CsopProgressBarType;
  // only applies to 'determinate' progress. Indicates whether to show a percentage text label next to the progress bar.
  showPercentLabel: boolean;
  // only applies to 'indeterminate'. Specifies the size of the spinner. values are 'normal' or 'small'
  // spinnerSize: CsopProgressBarSize;
  // set to true to make the progress visible.
  visible: boolean;
  // Set to true to make the progress prominent on the page, centered horizontally and vertically.
  // You would usually set isModal to true when using wholePage(wholePage progress is not modal by default;
  // you must set isModal to true explicitly if you want that.)
  // wholePage: boolean;
}
