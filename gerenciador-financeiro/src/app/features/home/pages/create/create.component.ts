import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';
import { JsonPipe } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionsService } from '../../../../shared/transaction/services/transactions.service';
import { TransactionPayload } from '../../../../shared/transaction/interfaces/transaction';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from '../../../../shared/feedback/services/feedback.service';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    JsonPipe,
    NgxMaskDirective,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  readonly transactionTypes = TransactionType;

  private _transactionsService = inject(TransactionsService);
  private _router = inject(Router);
  private _feedbackService= inject(FeedbackService);

  form = new FormGroup({
    type: new FormControl('', {validators: [Validators.required]}),
    title: new FormControl('', {validators: [Validators.required]}),
    value: new FormControl(0, {validators: [Validators.required]}),
  });

  submit(): void {
    if(this.form.invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form.value.title as string,
      type: this.form.value.type as TransactionType,
      value: this.form.value.value as number,
    }

    this._transactionsService.post(payload).subscribe({
      next:() => {
        this._feedbackService.success('Transação criada com sucesso');
        this._router.navigate(['/']);
      }
    });
  }
}
