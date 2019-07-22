import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    SessionExpiredComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  entryComponents: [
    SessionExpiredComponent
  ]
})
export class SessionExpiredModule { }
