import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary classes
import {
  editItem,
  addItem,
  loadItemById,
  addItemSuccess,
} from 'src/app/store/item/item.actions';
import { Item } from 'src/app/store/item/item.model';
import { selectSelectedItem } from 'src/app/store/item/item.selectors';
import { filter } from 'rxjs';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup; // Create a FormGroup for the form
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    this.itemForm = this.fb.group({
      // Initialize the form group
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true; // Set edit mode to true
      this.store.dispatch(loadItemById({ id: +id })); // Dispatch action to load item by ID

      // Use the selectSelectedItem selector to get the item from the store
      this.store.select(selectSelectedItem).subscribe((item) => {
        if (item) {
          this.itemForm.patchValue(item); // Populate the form with existing item data
        }
      });
    }
  }

  // Method to handle form submission
  onSubmit() {
    if (this.itemForm.valid) {
      if (this.isEditMode) {
        const updatedItem: Item = {
          ...this.itemForm.value,
          id: +this.route.snapshot.paramMap.get('id')!,
        };
        this.store.dispatch(editItem({ item: updatedItem }));
      } else {
        const newItem: Item = { ...this.itemForm.value, id: Date.now() };
        this.store.dispatch(addItem({ item: newItem }));
      }
      this.router.navigate(['/items']); // Redirect after adding or editing
    }
  }
}
