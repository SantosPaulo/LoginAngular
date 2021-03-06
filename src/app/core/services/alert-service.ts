import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string = '', duration: number = 3000): void {
    this._snackBar.open(message, action, {
      duration,
    });
  }
}
