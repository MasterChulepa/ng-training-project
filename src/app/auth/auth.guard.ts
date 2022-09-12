import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{
    constructor(private auth: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return this.auth.newuser.pipe(take(1), map(user => {
        console.log(user)
        if (!!user){
            return true
        }else{
            return this.router.createUrlTree(['/auth'])
        }
     }))
    }
}