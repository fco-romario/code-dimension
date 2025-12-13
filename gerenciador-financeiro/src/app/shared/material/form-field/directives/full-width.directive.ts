import { booleanAttribute, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFullWidth]'
})
export class FullWidthDirective {
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);

  applyFullWidth = input(true, {
    transform: booleanAttribute,
    alias: 'appFullWidth',
  });

  constructor() {
    effect(() => {
      if (this.applyFullWidth()) {
        this._renderer2.setStyle(this._elementRef.nativeElement, 'width', '100%');
      }
    })
  }

}
