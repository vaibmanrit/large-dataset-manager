import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

const routes: Routes = [
  { path: '', component: ItemListComponent }, // Route for item list
  { path: 'details/:id', component: ItemDetailsComponent }, // Route for item details
  { path: 'add', component: ItemFormComponent }, // Route for adding a new item
  { path: 'edit/:id', component: ItemFormComponent }, // Route for editing an existing item
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
