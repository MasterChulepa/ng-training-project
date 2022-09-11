import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeManagerService } from '../../recipe-manager.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode!: boolean;
  form!: FormGroup;
  constructor(private route: ActivatedRoute, private recipeManager: RecipeManagerService, private router: Router){ }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  private initForm() {
    const dish = this.recipeManager.getRecipeInfo(this.id);
    let title = '';
    let imageSRC = '';
    let description = '';
    let ingredientsArr = new FormArray<FormGroup>([]);
    if (this.editMode) {
      title = <string>dish?.title;
      imageSRC = <string>dish?.imageSRC;
      description = <string>dish?.description;
      if (dish?.ingredients) {
        dish.ingredients.forEach(item => {
          ingredientsArr.push(new FormGroup({
            'name': new FormControl(item.name, Validators.required),
            'amount': new FormControl(item.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
          }))
        })
      }
    }
    this.form = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'imageURL': new FormControl(imageSRC, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredientsArr': ingredientsArr
    })
  }
  getControls() {
    return (<FormArray>this.form.get('ingredientsArr')).controls;
  }

  addNewIngredient() {
    (<FormArray>this.form.get('ingredientsArr')).push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl()
    }))
  }

  deleteIngredient(index: number){
    this.getControls().splice(index, 1);
  }

  cancelEditing(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onSubmit(){
    const newRecipe = new Recipe(this.form.value['title'],
    this.form.value['description'], this.form.value['imageURL'], this.form.value['ingredientsArr'] )
    if (this.editMode){
      this.recipeManager.updateRecipe(this.id, newRecipe)
    }else{
      this.recipeManager.addRecipe(newRecipe);
    }
    this.cancelEditing()

  }
}
