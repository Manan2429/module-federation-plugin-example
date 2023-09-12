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

/** Exports the Login Module */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
// import { StorageService } from '../core/services/storage.service';
// import { LoginService } from '../core/services/login.service';// core/services/login.service';
// import { AsgProgressModule } from '../asg-progress/asg-progress.module';

// import { CoreServicesModule } from '../core/core-services/core-services.module';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
     /*CoreServicesModule,
     AsgProgressModule*/],
     
    declarations: [LoginComponent],
  exports: [LoginComponent],
  // providers: [LoginService]
})

export class LoginModule { }
