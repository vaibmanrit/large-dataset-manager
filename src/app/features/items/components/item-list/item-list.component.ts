import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/core/services/item.service';
import { loadItems } from 'src/app/store/item/item.actions';
import {
  selectAllItems,
  selectItemsError,
} from 'src/app/store/item/item.selectors';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items$: Observable<any[]>;
  error$: Observable<string | null>; // Observable to hold the error state

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadItems()); // Dispatch loadItems action to load items
    this.items$ = this.store.select(selectAllItems); // Select items from the store
    this.error$ = this.store.select(selectItemsError); // Select error state from the store
  }
}
