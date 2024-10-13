import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [MatToolbarModule, RouterTestingModule], // Move MatCardModule to the imports array
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to update the view
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'large-dataset-manager'`, () => {
    expect(component.title).toEqual('large-dataset-manager');
  });

  it('should render title in a span tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain(
      'large-dataset-manager app is running!'
    );
  });
});
