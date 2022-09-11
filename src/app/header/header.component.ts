import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { HttpServiceService } from "../http-service.service";
import { RecipeManagerService } from "../recipe-book/recipe-manager.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class Header implements OnInit, OnDestroy {
    isAuthenticated = false;
    authSubs!: Subscription
    constructor(private httpManager: HttpServiceService, private recipeManager: RecipeManagerService, private authService: AuthService) {
    }
    ngOnInit(): void {
        this.authSubs = this.authService.newuser.subscribe(user => {
            this.isAuthenticated = !!user;
        })
    }
    onLogout() {
        this.authService.logout();
    }
    ngOnDestroy(): void {
        this.authSubs.unsubscribe()
    }
    onFetchData() {
        this.recipeManager.fetchContent()
    }
    onSaveData() {
        this.httpManager.saveData(this.recipeManager.getContent())
    }
}