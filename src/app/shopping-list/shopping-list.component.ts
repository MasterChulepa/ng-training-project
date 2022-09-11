import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListManagerService } from './shopping-list-manager.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  shoppingSubscription!: Subscription;

  constructor(public shoppingManager: ShoppingListManagerService) { 
    this.ingredients = shoppingManager.getIngredients();
  }

  ngOnInit(): void {
    this.shoppingSubscription = this.shoppingManager.ingredientChanged
    .subscribe(
      (ingredientsArr: Ingredient[]) => this.ingredients = ingredientsArr
    );
  }

  fillFormFields(i: number){
    this.shoppingManager.chooseIngredient(i);
  }

  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe()
  }

}
