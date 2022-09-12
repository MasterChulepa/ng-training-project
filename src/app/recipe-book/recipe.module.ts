import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";


import { RecipeBook } from "./recipe-book.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-list/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRoutin } from "./recipe-routing.module";


@NgModule({
    declarations:[
        RecipeBook,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule, 
        ReactiveFormsModule,
        RecipeRoutin,
        SharedModule
    ]
})
export class RecipeModule{
}