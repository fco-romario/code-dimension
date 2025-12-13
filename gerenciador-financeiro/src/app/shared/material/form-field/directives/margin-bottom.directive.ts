import { booleanAttribute, computed, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarginBottom]'
})
export class MarginBottomDirective {
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);

  applyMarginBottom = input('', {
    // transform: (value: string) => value || '24px',
    alias: 'appMarginBottom',
  })

  resolvedMarginBottom = computed(() => this.applyMarginBottom() || '24px')
  
  constructor() {
    effect(() => {
      if (this.resolvedMarginBottom()) {
        this._renderer2.setStyle(this._elementRef.nativeElement, 'margin-bottom', this.resolvedMarginBottom());
      }
    });
   }

}
