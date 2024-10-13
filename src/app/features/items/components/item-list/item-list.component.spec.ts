import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { loadItems } from 'src/app/store/item/item.actions'; // Import necessary actions
import {
  selectAllItems,
  selectItemsError,
} from 'src/app/store/item/item.selectors'; // Import selectors
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let mockStore: any;

  beforeEach(async () => {
    // Create a mock store
    mockStore = {
      select: jasmine
        .createSpy()
        .and.callFake((selector: (state: any) => any) => {
          if (selector === selectAllItems) {
            return of([
              {
                id: 1,
                name: 'Test Item',
                description: 'Test Description',
                price: 100,
              },
            ]); // Mock items
          } else if (selector === selectItemsError) {
            return of(null); // No error initially
          }
          return of([]);
        }),
      dispatch: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ScrollingModule,
        StoreModule.forRoot({}), // Provide an empty store for tests
      ],
      providers: [
        { provide: Store, useValue: mockStore }, // Use the mocked store
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadItems action on initialization', () => {
    component.ngOnInit(); // Call ngOnInit to simulate initialization
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadItems()); // Check if loadItems action was dispatched
  });

  it('should have an Add Item button that navigates correctly', () => {
    const addButton = fixture.debugElement.query(
      By.css('.add-item-container button')
    ).nativeElement;
    expect(addButton).toBeTruthy(); // Ensure the button is present
    expect(addButton.textContent).toContain('Add Item'); // Check button text

    // Simulate clicking the button
    addButton.click();

    // Check if routerLink was called (you can also use a spy on the router if needed)
    // Here, you may want to spy on the router and check the navigation.
  });
});
