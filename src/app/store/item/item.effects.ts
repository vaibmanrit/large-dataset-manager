import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadItems,
  loadItemsSuccess,
  loadItemsFailure,
  loadItemById,
  loadItemByIdSuccess,
  loadItemByIdFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  editItem,
  editItemSuccess,
  editItemFailure,
} from './item.actions';
import { catchError, map, of } from 'rxjs';
import { ItemService } from 'src/app/core/services/item.service';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private itemService: ItemService // Inject your ItemService
  ) {}

  // Effect for loading all items
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItems), // Listen for loadItems action
      map(() => {
        const items = this.itemService.getItems(); // Use the service to generate fake items
        return loadItemsSuccess({ items }); // Dispatch success action with the items
      }),
      catchError((error) => of(loadItemsFailure({ error }))) // Handle errors
    )
  );

  // Effect for loading an item by ID
  loadItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadItemById), // Listen for loadItemById action
      map(({ id }) => {
        const item = this.itemService.getItemById(id); // Use the service to get the item
        if (item) {
          return loadItemByIdSuccess({ item }); // Dispatch success action with the item
        } else {
          throw new Error('Item not found'); // Handle case where item does not exist
        }
      }),
      catchError((error) => of(loadItemByIdFailure({ error }))) // Handle errors
    )
  );

  // Effect for adding an item
  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItem), // Listen for addItem action
      map(({ item }) => {
        this.itemService.addItem(item);
        return addItemSuccess({ item }); // Dispatch success action with the added item
      }),
      catchError((error) => of(addItemFailure({ error }))) // Handle errors
    )
  );

  // Effect for editing an item
  editItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editItem), // Listen for editItem action
      map(({ item }) => {
        this.itemService.editItem(item);
        return editItemSuccess({ item }); // Dispatch success action with the edited item
      }),
      catchError((error) => of(editItemFailure({ error }))) // Handle errors
    )
  );
}
