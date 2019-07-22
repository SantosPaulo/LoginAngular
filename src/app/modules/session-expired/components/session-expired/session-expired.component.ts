import { Component } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss']
})
export class SessionExpiredComponent {

  constructor(
    private readonly matDialogRef: MatDialogRef<Component>
  ) {}

  dismiss(): void {
    this.matDialogRef.close();
  }
}
