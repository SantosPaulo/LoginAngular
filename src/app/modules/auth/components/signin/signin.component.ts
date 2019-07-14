import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '@app/core/services/alert-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private readonly alertService: AlertServiceService
  ) {}

  ngOnInit() {}

  submit() {
    this.alertService.openSnackBar('OK');
  }
}
