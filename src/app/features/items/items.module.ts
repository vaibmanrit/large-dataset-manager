import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ItemListComponent, ItemDetailsComponent, ItemFormComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatListModule,
  ],
})
export class ItemsModule {}
