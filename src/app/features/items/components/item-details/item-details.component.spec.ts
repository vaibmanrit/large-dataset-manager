import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailsComponent } from './item-details.component';
import { StoreModule } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { itemReducer } from '../../../../store/item/item.reducer'; // Import the reducers

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ItemDetailsComponent],
      imports: [
        StoreModule.forRoot(itemReducer), // Import the store
        RouterTestingModule,
        MatCardModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }, // Mock ActivatedRoute to return a parameter
            paramMap: of({ get: () => '1' }), // Mock paramMap as an observable for any subscriptions
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadItemById action on init', () => {
    spyOn(component['store'], 'dispatch');
    component.ngOnInit();
    expect(component['store'].dispatch).toHaveBeenCalled();
  });

  it('should navigate to edit page when onEdit is called', () => {
    const itemId = 1;
    component.onEdit(itemId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/items/edit', itemId]);
  });
});
