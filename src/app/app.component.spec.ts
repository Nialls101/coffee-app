import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as displayMessage 'Select your coffee beverage of choice'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.displayMessage).toEqual('Select your coffee beverage of choice');
  });

  it('should render displayMessage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.display')?.textContent).toContain('Select your coffee beverage of choice');
  });

  it(`should have as powerButton equal 'true'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.powerButton).toEqual(true);
  });
  
  it(`should have as currentDate equal todays date`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentDate).toEqual(new Date().toDateString());
  });

  it(`should have as isBrewing equal 'false'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isBrewing).toEqual(false);
  });
  
  it(`should have as beverageSelected equal ''`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.beverageSelected).toEqual('');
  });
  
  it(`should have as coffeeIngredients equal '{ beans: 25, milk: 20, sugar: 100 }'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.coffeeIngredients).toEqual({ beans: 25, milk: 20, sugar: 100 });
  });
  
  it(`should have as currentOrder equal '{ beans: 0, milk: 0, sugar: 0 }'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentOrder).toEqual({ beans: 0, milk: 0, sugar: 0 });
  });
});
