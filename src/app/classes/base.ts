import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class Base implements OnDestroy {

    protected subscriptions = new Subscription();

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
