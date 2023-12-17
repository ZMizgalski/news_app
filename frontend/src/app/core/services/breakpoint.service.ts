import { DestroyRef, Injectable } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map, shareReplay } from "rxjs";

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Injectable()
export class BreakpointService {
    public readonly $isHandset: Observable<boolean> = this.observeBreakpoint(Breakpoints.Handset);

    constructor(
        private readonly _breakpointObserver: BreakpointObserver,
        private readonly _destroyRef: DestroyRef
    ) {}

    public observeBreakpoint(breakpoint: string): Observable<boolean> {
        return this._breakpointObserver
            .observe(breakpoint)
            .pipe(
                map(result => result.matches),
                shareReplay(),
                takeUntilDestroyed(this._destroyRef)
            );
    }
}
