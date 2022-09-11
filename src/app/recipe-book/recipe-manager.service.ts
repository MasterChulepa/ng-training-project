import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpServiceService } from '../http-service.service';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeManagerService {
  constructor(private httpManager: HttpServiceService) { }
  recipelistChanged = new Subject<Recipe[]>();
  private content: Recipe[] = [];

  getContent() {
    return this.content.slice();
  }

  updateContent(recipes: Recipe[]) {
    this.content = recipes;
    this.recipelistChanged.next(this.content.slice())
  }

  getRecipeInfo(index: number) {
    return this.content.slice()[index]
  }

  fetchContent() {
    this.httpManager.fetchdata().pipe(map(data => {
      return data.map(item => {
        return {
          ...item, ingredients: item.ingredients ? item.ingredients : []
        }
      })
    })).subscribe(response => {
      this.updateContent(response);
      console.log(response)
    })
  }

  addRecipe(recipe: Recipe) {
    this.content.push(recipe);
    this.recipelistChanged.next(this.content.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.content[index] = newRecipe;
    this.recipelistChanged.next(this.content.slice())
  }

  onDeleteRecipe(index: number) {
    this.content.splice(index, 1);
    this.recipelistChanged.next(this.content.slice());
  }
}
