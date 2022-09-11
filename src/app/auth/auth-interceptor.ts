import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.newuser.pipe(take(1), exhaustMap( user => {
            if (!user){
                return next.handle(req)
            }
            let modifiedReq = req.clone({params: new HttpParams().set('auth', user?.token!)})  
            return next.handle(modifiedReq)     
        })
    )}
    
}