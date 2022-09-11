import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeManagerService } from 'src/app/recipe-book/recipe-manager.service';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  content!: Recipe[];
  subscribtion!: Subscription;

  constructor(public recipeManager: RecipeManagerService, private router: Router, private route: ActivatedRoute) { }


  fireInfo(index: number){
    this.router.navigate([index], {relativeTo: this.route});
  }

  onRecipeEdit(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.content = this.recipeManager.getContent();
    this.subscribtion = this.recipeManager.recipelistChanged.subscribe((recipelist: Recipe[]) => this.content = recipelist) ;
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }
}
