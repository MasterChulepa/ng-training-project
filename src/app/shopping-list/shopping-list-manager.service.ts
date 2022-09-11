import { Injectable } from '@angular/core';
import { Subject, toArray } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListManagerService {
  ingredientChanged = new Subject<Ingredient[]>();
  formFilled = new Subject<number>();
  private ingredients: Ingredient[] = [new Ingredient('Apples', 5), new Ingredient('Tommatoes', 3)]


  add(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice())

  }

  getIngredients() {
    return this.ingredients.slice();
  }

  delete(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.getIngredients())
  }

  sendInfo(ingredientsArr: Ingredient[]) {
    ingredientsArr.forEach(element => 
      this.ingredients.push(element))
      this.ingredientChanged.next(this.ingredients.slice())
  }

  chooseIngredient(i: number){
    this.formFilled.next(i);
  }

  updateIngredientInfo(index: number, item: Ingredient){
    this.ingredients[index] = item;
    this.ingredientChanged.next(this.ingredients.slice())
  }

}
