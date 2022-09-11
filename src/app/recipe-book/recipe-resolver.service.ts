import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { RecipeManagerService } from "./recipe-manager.service";
import { Recipe } from "./recipe.model";

@Injectable({ providedIn: "root" })

export class RecipeResolver implements Resolve<Recipe>{

  constructor(private recipeManager: RecipeManagerService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
    return <Recipe>this.recipeManager.getRecipeInfo(route.params['id']);
  }


}