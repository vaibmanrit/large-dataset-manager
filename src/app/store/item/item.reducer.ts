import { createReducer, on } from '@ngrx/store';
import {
  loadItemsSuccess,
  loadItemsFailure,
  loadItemByIdSuccess,
  loadItemByIdFailure,
  addItemSuccess,
  addItemFailure,
  editItemSuccess,
  editItemFailure,
} from './item.actions';
import { Item } from './item.model';

export interface ItemState {
  items: Item[];
  selectedItem: Item | null; // Holds the currently selected item
  error: string | null; // Holds error messages
}

export const initialState: ItemState = {
  items: [],
  selectedItem: null,
  error: null,
};

export const itemReducer = createReducer(
  initialState,
  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    items, // Set the loaded items in the state
    error: null,
  })),
  on(loadItemsFailure, (state, { error }) => ({
    ...state,
    error, // Set the error in the state
  })),
  on(loadItemByIdSuccess, (state, { item }) => ({
    ...state,
    selectedItem: item, // Set the selected item in the state
    error: null,
  })),
  on(loadItemByIdFailure, (state, { error }) => ({
    ...state,
    error, // Set the error in the state
  })),
  on(addItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item], // Add the new item to the list
    error: null,
  })),
  on(addItemFailure, (state, { error }) => ({
    ...state,
    error, // Set the error in the state
  })),
  on(editItemSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => (i.id === item.id ? item : i)), // Update the edited item
    error: null,
  })),
  on(editItemFailure, (state, { error }) => ({
    ...state,
    error, // Set the error in the state
  }))
);
