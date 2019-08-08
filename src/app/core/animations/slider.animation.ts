import { trigger, transition, query, group, animate, style } from '@angular/animations';

export const slider = trigger(
    'routeAnimations', [
        // transition('* => left', slideTo('left')),
        // transition('* => right', slideTo('right')),
        transition('left => *', slideTo('right')),
        transition('right => *', slideTo('left')),
    ]
);

function slideTo(direction: string) {

    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            }),
        ], { optional: true }),

        query(':enter', [
            style({ [direction]: '-100%' })
        ]),

        group([
            query(':leave', [
                animate('600ms ease', style({ [direction]: '100%' }))
            ], { optional: true }),
            query(':enter', [
                animate('600ms ease', style({ [direction]: '0' }))
            ], { optional: true })
        ])
    ];
}
