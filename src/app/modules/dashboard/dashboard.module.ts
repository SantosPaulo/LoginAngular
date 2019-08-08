import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PageOneComponent } from './components/page-one/page-one.component';
import { PageTwoComponent } from './components/page-two/page-two.component';
import { PageThreeComponent } from './components/page-three/page-three.component';

import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    DashboardComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    AvatarModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
