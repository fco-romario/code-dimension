import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-no-transaction',
  imports: [MatCardModule],
  templateUrl: './no-transaction.html',
  styleUrl: './no-transaction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTransaction {

}
