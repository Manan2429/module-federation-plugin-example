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

/** Exports the Tenant Module */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { CoreAppContainerComponent } from '../app-container/core-app-container.component';

import { AppSelectorComponent } from './app-selector.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // NgbModule,
        RouterModule,
    ],
    declarations: [
        // CoreAppContainerComponent,
        AppSelectorComponent,
    ],
    exports: [
        // CoreAppContainerComponent,
        AppSelectorComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppSelectorModule { }
