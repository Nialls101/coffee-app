import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CoffeeIngredients } from './coffee-ingredients.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayMessage = 'Select your coffee beverage of choice';
  powerButton = true;
  currentDate = new Date().toDateString();
  isBrewing = false;
  beverageSelected = '';
  coffeeIngredients: CoffeeIngredients = { beans: 25, milk: 20, sugar: 100 };
  currentOrder: CoffeeIngredients = { beans: 0, milk: 0, sugar: 0 };
  coffeeIngredientLevels = new BehaviorSubject<CoffeeIngredients>(this.coffeeIngredients);

  selectedBeverageIngredients = new BehaviorSubject<CoffeeIngredients>(this.currentOrder);

  coffeeMachineForm = new FormGroup({
    sugarAmount: new FormControl([0, Validators.nullValidator]),
    milkWithCoffee: new FormControl([0, Validators.nullValidator]),
  });

  constructor() { }

  ngOnInit(): void { }

  clickPowerButton() {
    this.powerButton = !this.powerButton;
    if (this.powerButton === true) {
      this.displayMessage = 'Select your coffee beverage of choice';
    } else {
      this.displayMessage = this.currentDate;
    }
    this.resetCoffeeMachine();
  }

  selectBeverage(beverage: string) {
    // select cappuccino, coffee or latte
    switch (beverage) {
      case 'cappuccino':
        this.beverageSelected = beverage;
        this.currentOrder = { beans: 5, milk: 3, sugar: 0 };
        this.coffeeMachineForm.controls['milkWithCoffee'].reset();
        break;
      case 'coffee':
        this.beverageSelected = beverage;
        this.currentOrder = { beans: 2, milk: 0, sugar: 0 };
        break;
      case 'latte':
        this.beverageSelected = beverage;
        this.currentOrder = { beans: 3, milk: 2, sugar: 0 };
        this.coffeeMachineForm.controls['milkWithCoffee'].reset();
        break;
    }
  }

  updateCoffeeOrder() {
    if (this.coffeeMachineForm.controls['milkWithCoffee'].value === true) {
      this.currentOrder.milk = 1;
    } else {
      this.currentOrder.milk = 0;
    }
  }

  brewingDisplayMessage(beverage: string) {
    setTimeout(() => {
      this.displayMessage = beverage + ' is ready!';
      this.isBrewing = false;
    }, 3000);
  }

  resetDisplayMessage() {
    setTimeout(() => {
      this.displayMessage = 'Select your coffee beverage of choice';
    }, 5000);
  }

  resetCoffeeMachine() {
    this.beverageSelected = '';
    this.currentOrder = { beans: 0, milk: 0, sugar: 0 };
    this.coffeeMachineForm.controls['milkWithCoffee'].reset();
  }

  brewBeverage() {
    this.isBrewing = true;
    if ((this.coffeeIngredientLevels.value.beans < 5) && (this.coffeeIngredientLevels.value.milk < 3)) {
      this.isBrewing = false;
      this.displayMessage = 'Not enough beans and milk running low, please refill';
      this.resetDisplayMessage();
    } else if (this.coffeeIngredientLevels.value.beans < 5) {
      this.isBrewing = false;
      this.displayMessage = 'Not enough beans, please refill';
      this.resetDisplayMessage();
    } else if (this.coffeeIngredientLevels.value.milk < 3) {
      this.isBrewing = false;
      this.displayMessage = 'Milk running low, please refill';
      this.resetDisplayMessage();
    } else if (this.coffeeIngredientLevels.value.sugar < 5) {
      this.isBrewing = false;
      this.displayMessage = 'Sugar running low, please refill';
      this.resetDisplayMessage();
    }
    if (
      (this.coffeeIngredientLevels.value.beans >= 5) &&
      (this.coffeeIngredientLevels.value.milk >= this.currentOrder.milk) &&
      (this.coffeeIngredientLevels.value.sugar >= this.currentOrder.sugar)
    ) {
      this.coffeeIngredientLevels.value.beans = this.coffeeIngredientLevels.value.beans - this.currentOrder.beans;
      this.displayMessage = this.beverageSelected + ' is brewing';
      this.brewingDisplayMessage(this.beverageSelected);
    }
    if (
      (this.coffeeIngredientLevels.value.beans >= this.currentOrder.beans) &&
      (this.coffeeIngredientLevels.value.milk >= this.currentOrder.milk) &&
      (this.coffeeIngredientLevels.value.sugar >= this.currentOrder.sugar)
    ) {
      this.coffeeIngredientLevels.value.milk = this.coffeeIngredientLevels.value.milk - this.currentOrder.milk;
    }
    if (this.coffeeIngredientLevels.value.sugar >= this.currentOrder.sugar) {
      this.coffeeIngredientLevels.value.sugar = this.coffeeIngredientLevels.value.sugar - this.currentOrder.sugar;
    }

    this.resetCoffeeMachine();
    this.resetDisplayMessage();
    
  }

  onSubmit() {
    this.brewBeverage();
  }
}