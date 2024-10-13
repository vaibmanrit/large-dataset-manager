import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';
import { Item } from '../../store/item/item.model';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of items', () => {
    const items: Item[] = service.getItems();
    expect(items.length).toBe(20); // Assuming 20 items are generated
  });

  it('should return the correct item by ID', () => {
    const item = service.getItemById(1);
    expect(item).toBeTruthy();
    expect(item?.id).toEqual(1);
  });
});
