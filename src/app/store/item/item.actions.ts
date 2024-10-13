import { createAction, props } from '@ngrx/store';
import { Item } from './item.model'; // Make sure the Item model is defined correctly

// Action to load all items
export const loadItems = createAction('[Item] Load Items');

// Action for successfully loading all items
export const loadItemsSuccess = createAction(
  '[Item] Load Items Success',
  props<{ items: Item[] }>() // Pass an array of items
);

// Action for failing to load items
export const loadItemsFailure = createAction(
  '[Item] Load Items Failure',
  props<{ error: any }>() // Pass error details
);

// Action to load a specific item by ID
export const loadItemById = createAction(
  '[Item] Load Item By ID',
  props<{ id: number }>() // Pass the ID of the item to load
);

// Action for successfully loading a specific item
export const loadItemByIdSuccess = createAction(
  '[Item] Load Item By ID Success',
  props<{ item: Item }>() // Pass the loaded item
);

// Action for failing to load a specific item
export const loadItemByIdFailure = createAction(
  '[Item] Load Item By ID Failure',
  props<{ error: any }>() // Pass error details
);

// Action to add a new item
export const addItem = createAction(
  '[Item] Add Item',
  props<{ item: Item }>() // Pass the item to add
);

// Action for successfully adding a new item
export const addItemSuccess = createAction(
  '[Item] Add Item Success',
  props<{ item: Item }>() // Pass the added item
);

// Action for failing to add a new item
export const addItemFailure = createAction(
  '[Item] Add Item Failure',
  props<{ error: any }>() // Pass error details
);

// Action to edit an existing item
export const editItem = createAction(
  '[Item] Edit Item',
  props<{ item: Item }>() // Pass the item with updated details
);

// Action for successfully editing an item
export const editItemSuccess = createAction(
  '[Item] Edit Item Success',
  props<{ item: Item }>() // Pass the edited item
);

// Action for failing to edit an item
export const editItemFailure = createAction(
  '[Item] Edit Item Failure',
  props<{ error: any }>() // Pass error details
);
