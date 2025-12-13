import { booleanAttribute, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarginBottom]'
})
export class MarginBottomDirective {
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);

  applyMarginBottom = input('', {
    transform: (value: string) => value || '24px',
    alias: 'appMarginBottom',
  })
  
  constructor() {
    effect(() => {
      if (this.applyMarginBottom()) {
        this._renderer2.setStyle(this._elementRef.nativeElement, 'margin-bottom', this.applyMarginBottom());
      }
    });
   }

}
