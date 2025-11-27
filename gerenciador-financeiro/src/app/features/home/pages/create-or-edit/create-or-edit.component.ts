import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transaction/enums/transaction-type';
import { JsonPipe } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionsService } from '../../../../shared/transaction/services/transactions.service';
import { Transaction, TransactionPayload } from '../../../../shared/transaction/interfaces/transaction';
import { ActivatedRoute, Router } from '@angular/router';
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
    NgxMaskDirective,
  ],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent implements OnInit{
  // private _activatedRoute = inject(ActivatedRoute);
  private _transactionsService = inject(TransactionsService);
  private _router = inject(Router);
  private _feedbackService= inject(FeedbackService);
  
  transaction = input<Transaction>();

  readonly transactionTypes = TransactionType;

  // get transaction(): Transaction {
  //   return this._activatedRoute.snapshot.data['transaction'];
  // }

  // get isEdit() {
  //   return Boolean(this.transaction);
  // }

  isEdit = computed(() => Boolean(this.transaction()));

  form = computed(() =>
    new FormGroup({
      type: new FormControl(this.transaction()?.type || '', {validators: [Validators.required]}),
      title: new FormControl(this.transaction()?.title || '', {validators: [Validators.required]}),
      value: new FormControl(this.transaction()?.value || 0, {validators: [Validators.required]}),
    })
  )

  ngOnInit(): void {
    // console.log('data', this._activatedRoute.snapshot.data);
    
  }

  submit(): void {
    if(this.form().invalid) {
      return;
    }

    const payload: TransactionPayload = {
      title: this.form().value.title as string,
      type: this.form().value.type as TransactionType,
      value: this.form().value.value as number,
    }

    if(this.isEdit()) {
      this._transactionsService.put(this.transaction()!.id ,payload).subscribe({
      next:() => {
        this._feedbackService.success('Transação editada com sucesso');
        this._router.navigate(['/']);
      }
      });
    } else {
      this._transactionsService.post(payload).subscribe({
      next:() => {
          this._feedbackService.success('Transação criada com sucesso');
          this._router.navigate(['/']);
        }
      });
    }
  }
}
