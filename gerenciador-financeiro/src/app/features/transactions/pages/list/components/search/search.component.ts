import { Component, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-search',
  imports: [MatFormFieldModule, MatInputModule, ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchText = model.required<string>();
}
