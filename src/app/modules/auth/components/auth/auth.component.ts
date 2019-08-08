import { Component } from '@angular/core';
import { slider } from '@app/core/animations/slider.animation';
import { Base } from '@app/classes/base';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [ slider ]
})
export class AuthComponent extends Base {

  constructor() {
    super();
  }
}
