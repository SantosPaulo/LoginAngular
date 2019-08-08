import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';

export class Base implements OnDestroy {

    protected subscriptions = new Subscription();

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    prepareRoute(outlet: RouterOutlet): string|undefined|null {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
