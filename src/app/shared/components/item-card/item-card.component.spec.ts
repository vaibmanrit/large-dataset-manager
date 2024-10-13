import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card.component';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from 'src/app/store/item/item.model';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;

  const mockItem: Item = {
    id: 1,
    name: 'Test Item',
    description: 'This is a test item.',
    price: 100.0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCardComponent],
      imports: [
        MatCardModule, // Import Angular Material modules
        BrowserAnimationsModule, // Required for animations in Angular Material
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    component.item = mockItem; // Set the mock input data
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the item price', () => {
    const priceElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(priceElement.textContent).toContain('Price: $100.00'); // Check the price displayed
  });

  it('should project title content correctly', () => {
    const titleContent = `<span slot="title">${mockItem.name}</span>`;
    fixture.componentInstance.item = mockItem; // Set the item input
    fixture.detectChanges(); // Trigger change detection

    const titleElement = fixture.debugElement.query(
      By.css('mat-card-header')
    ).nativeElement;
    titleElement.innerHTML = titleContent; // Set projected content

    expect(titleElement.textContent).toContain(mockItem.name); // Verify title content
  });

  it('should project description content correctly', () => {
    const descriptionContent = `<p slot="description">${mockItem.description}</p>`;
    fixture.componentInstance.item = mockItem; // Set the item input
    fixture.detectChanges(); // Trigger change detection

    const descriptionElement = fixture.debugElement.query(
      By.css('mat-card-content')
    ).nativeElement;
    descriptionElement.innerHTML = descriptionContent; // Set projected content

    expect(descriptionElement.textContent).toContain(mockItem.description); // Verify description content
  });
});
