import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

export class CustomPreloading implements PreloadingStrategy {

    preload(route: Route, load: Function): Observable<any> {

        return route.data && route.data.preload 
            ? this._loadRoute(route.data.delay, load)
            : EMPTY;
    }

    private _loadRoute(delay: number, load: Function): Observable<any> {
        return delay ?
                timer(150).pipe(flatMap(() => load())) :
                load();
    }
}
