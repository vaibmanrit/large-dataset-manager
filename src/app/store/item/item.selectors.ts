import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from './item.reducer';

export const selectItemState = createFeatureSelector<ItemState>('item');

export const selectAllItems = createSelector(
  selectItemState,
  (state: ItemState) => state.items
);

export const selectItemsError = createSelector(
  selectItemState,
  (state: ItemState) => state.error
);

// Selector for the selected item
export const selectSelectedItem = createSelector(
  selectItemState,
  (state: ItemState) => state.selectedItem
);
