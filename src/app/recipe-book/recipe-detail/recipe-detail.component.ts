import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListManagerService } from 'src/app/shopping-list/shopping-list-manager.service';
import { RecipeManagerService } from '../recipe-manager.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;
  id!: number;

  constructor(private shoppingManager: ShoppingListManagerService,
     private route: ActivatedRoute, private router: Router, private recipeManager: RecipeManagerService) {

  }

  sendIngredientInfo() {
    this.shoppingManager.sendInfo(this.recipe.ingredients);
  }
  ngOnInit(): void {
    this.route.data.subscribe((params: Params) => this.recipe = params['recipe']);
    this.route.params.subscribe((params: Params) => this.id = params['id'])
  }
  openRecipeEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route, queryParams:{'id': this.id}})
  }

  deleteRecipe(){
    this.recipeManager.onDeleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
