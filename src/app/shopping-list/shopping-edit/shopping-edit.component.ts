import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListManagerService } from 'src/app/shopping-list/shopping-list-manager.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) formElement!: NgForm;
  ingredientSubscription!: Subscription;
  ingredient!: Ingredient;
  editMode = false;
  index!: number;
  constructor(public shoppingManager: ShoppingListManagerService) { }

  addProduct() {
    const value = this.formElement.value;
    if (this.editMode) {
      this.shoppingManager.updateIngredientInfo(this.index, new Ingredient(value.name, value.amount));
    } else {
      this.shoppingManager.add(new Ingredient(value.name, value.amount));
    }
    this.formElement.reset();
    this.editMode = false;
  }

  deleteLastProduct() {
    this.shoppingManager.delete(this.index);
  }

  ngOnInit(): void {
    this.ingredientSubscription = this.shoppingManager.formFilled
      .subscribe(
        (index: number) => {
          this.index = index;
          this.ingredient = this.shoppingManager.getIngredients()[this.index];
          this.formElement.setValue({
            'name': this.ingredient.name,
            'amount': this.ingredient.amount
          });
          this.editMode = true;
        }
      )
  }
  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

}
