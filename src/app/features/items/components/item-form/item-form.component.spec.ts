import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemFormComponent } from './item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemListComponent } from '../item-list/item-list.component';
import { Item } from 'src/app/store/item/item.model';

describe('ItemFormComponent', () => {
  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;

  const mockStore = {
    select: jasmine.createSpy().and.returnValue(of({ items: [] })),
    dispatch: jasmine.createSpy(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'items', component: ItemListComponent }, // Mock route for items
        ]),
        StoreModule.forRoot({}),
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form for adding a new item', () => {
    expect(component.isEditMode).toBeFalse();
    expect(component.itemForm.valid).toBeFalse();
  });

  it('should initialize the form for editing an existing item', () => {
    const mockItem: Item = {
      id: 1,
      name: 'Test Item',
      description: 'Test Description',
      price: 100,
    };

    // Mock the store to return the mock item
    mockStore.select.and.returnValue(of(mockItem));

    // Simulate route parameter
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue('1');

    component.ngOnInit();

    expect(component.isEditMode).toBeTrue();
    expect(component.itemForm.get('name')?.value).toBe(mockItem.name);
    expect(component.itemForm.get('description')?.value).toBe(
      mockItem.description
    );
    expect(component.itemForm.get('price')?.value).toBe(mockItem.price);
  });

  it('should dispatch addItem action when submitting the form to add a new item', () => {
    component.itemForm.setValue({
      name: 'New Item',
      description: 'New Description',
      price: 50,
    });
    component.onSubmit();

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({ type: '[Item] Add Item' })
    );
  });

  it('should dispatch editItem action when submitting the form to edit an existing item', () => {
    const mockItem: Item = {
      id: 1,
      name: 'Test Item',
      description: 'Test Description',
      price: 100,
    };
    mockStore.select.and.returnValue(of(mockItem));
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue('1');
    component.ngOnInit();

    component.itemForm.setValue({
      name: 'Updated Item',
      description: 'Updated Description',
      price: 150,
    });
    component.onSubmit();

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({ type: '[Item] Edit Item' })
    );
  });
});
