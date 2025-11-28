import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {

  private _snackBar = inject(MatSnackBar);
  
  success(message: string): void {
    this._snackBar.open(message, 'Ok', {
      panelClass: 'snak-bar-success-feedback',
    });
  }
  
  error(message: string): void {
    this._snackBar.open(message, 'Ok', {
      panelClass: 'snak-bar-error-feedback',
    });
  }
}
