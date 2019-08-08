import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertService } from '@app/core/services/alert-service';
import { FileUploadService } from '@app/core/services/file-upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertService,
    FileUploadService
  ],
  entryComponents: []
})
export class SharedModule { }
