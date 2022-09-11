import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Recipe } from './recipe-book/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  fetchdata(){
    return this.auth.newuser.pipe(take(1), exhaustMap( user => {
      return this.http.get<Recipe[]>('https://ng-rest-test-be151-default-rtdb.europe-west1.firebasedatabase.app/recips.json?auth='
      + user?.token)
    }))
  }
  
  saveData(newRecipes: Recipe[]){
    this.http.put('https://ng-rest-test-be151-default-rtdb.europe-west1.firebasedatabase.app/recips.json', newRecipes)
    .subscribe(response => console.log(response))
  }
}
