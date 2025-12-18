import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileLayoutService {
  private readonly _breakpointObserver = inject(BreakpointObserver);

  isMobile(): Signal<boolean> {
    const matches = this._breakpointObserver
      .observe('(max-width: 1280px)')
      .pipe(map((state) => state.matches))

      return toSignal(matches, { requireSync: true});
  }
}
