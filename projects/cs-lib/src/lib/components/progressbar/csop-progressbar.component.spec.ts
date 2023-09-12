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

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AsgProgressComponent } from 'asg-progress';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CsopProgressBarService } from '../../services/progressbarservice/csop-progressbar.service';

import { CsopProgressbarComponent } from './csop-progressbar.component';

describe('CsopProgressbarComponent', () => {
  // tslint:disable-next-line:no-uninitialized
  let component: CsopProgressbarComponent;
  let fixture: ComponentFixture<CsopProgressbarComponent> | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CsopProgressbarComponent,
        AsgProgressComponent
      ],
      providers: [
        CsopProgressBarService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CsopProgressbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the spinner size should be same as passed in the object', () => {
    if (fixture !== undefined) {
      const temp = fixture.debugElement.query(By.css('asg-progress'));
      const nativeTemp = temp.nativeElement;
      fixture.detectChanges();
      expect(nativeTemp.getAttribute('ng-reflect-spinner-size')).toBe('small');
    }
  });

  it('the message should be same as passed in object', () => {
    if (fixture !== undefined) {
      component.progressBar.message = 'test';
      fixture.detectChanges();
      const temp = fixture.debugElement.query(By.css('asg-progress'));
      const nativeTemp = temp.nativeElement;
      expect(nativeTemp.getAttribute('ng-reflect-message')).toBe('test');
    }
  });

  it('the visibilty should depend on the value in the object passed', () => {
    if (fixture !== undefined) {
      component.progressBar.visible = false;
      fixture.detectChanges();
      const temp = fixture.debugElement.query(By.css('asg-progress'));
      const nativeTemp = temp.nativeElement;
      expect(nativeTemp.getAttribute('ng-reflect-visible')).toBe('false');
    }
  });
});
