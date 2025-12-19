import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TransactionType } from '@shared/transaction/enums/transaction-type';

@Directive({
  selector: '[isIncome]'
})
export class IsIncomeDirective {
  private readonly _templateRef = inject(TemplateRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  transactionType = input.required({
      alias: 'isIncome' 
  }); 

  elseTemplate = input<TemplateRef<any>>(undefined, {
    alias: 'isIncomeElse'
  })

  constructor() {
    effect(() => {
      if(this.transactionType() === TransactionType.INCOME) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
      } else {
        if(this.elseTemplate()) {
          this._viewContainerRef.createEmbeddedView(this.elseTemplate()!);
        } else {
          this._viewContainerRef.clear();
        }
      }
    })
   }

}
