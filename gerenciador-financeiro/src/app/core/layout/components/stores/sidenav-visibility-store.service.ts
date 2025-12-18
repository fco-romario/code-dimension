import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavVisibilityStoreService {
  private _state = signal(false);

  isVisible = computed(() => this._state());

  toggle() {
    this._state.update((state) => !state);
  }
}
