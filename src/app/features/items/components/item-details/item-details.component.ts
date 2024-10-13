import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadItemById } from 'src/app/store/item/item.actions';
import { Item } from 'src/app/store/item/item.model';
import { selectSelectedItem } from 'src/app/store/item/item.selectors';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  item$: Observable<Item | null>; // Observable for selected item

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadItemById({ id }));
    this.item$ = this.store.select(selectSelectedItem);
  }

  onEdit(itemId: number): void {
    this.router.navigate(['/items/edit', itemId]); // Navigate to edit page with the item ID
  }
}
