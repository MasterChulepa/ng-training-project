import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/auth.guard'
import { RecipeBook } from './recipe-book.component'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component'
import { RecipeResolver } from './recipe-resolver.service'



const recipesRoutes: Routes = [
    {
        path: '',
        component: RecipeBook,
        canActivate: [AuthGuard],
        children: [
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    }
    // { path: '**', component: ErrorPageComponent }
]
@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [
        RouterModule
    ]
})


export class RecipeRoutin {
}