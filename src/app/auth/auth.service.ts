import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { AuthResponse, User, UserAccaunt } from "./user-info.module";

@Injectable({ providedIn: 'root' })

export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }
    newuser = new BehaviorSubject<User | null>(null);
    tokenExpirationDuration!: any;

    signup(userAccaunt: UserAccaunt) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3yRSecgme-AUD8YZLYxEfVl0x5uJ5yOk',
            { ...userAccaunt, returnSecureToken: true }).pipe(catchError(this.errorHandler),
                tap(responseData => this.authenticationHandler(responseData)))
    }

    login(userAccaunt: UserAccaunt) {
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3yRSecgme-AUD8YZLYxEfVl0x5uJ5yOk',
            { ...userAccaunt, returnSecureToken: true }).pipe(catchError(this.errorHandler),
                tap(responseData => this.authenticationHandler({ ...responseData })))
    }

    private authenticationHandler({ email, localId, idToken, expiresIn }: AuthResponse) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate)
        this.newuser.next(user);
        this.autoLogout(expirationDate.getTime())
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    autoLogin() {
        const userSnapshot = localStorage.getItem('userInfo');
        if (!userSnapshot) {
            return
        }
        if (typeof userSnapshot == 'string') {
            const userParsedObj: {
                email: string,
                id: string,
                _token: string,
                _tokenExpiratiomDate: string
            } = JSON.parse(userSnapshot);
            const user = new User(userParsedObj.email, userParsedObj.id, userParsedObj._token,
                new Date(userParsedObj._tokenExpiratiomDate));
            if (user.token) {
                this.newuser.next(user);
                const expirationDuration = new Date(userParsedObj._tokenExpiratiomDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration)
            }
        }
    }
    autoLogout(expirationDuration: number) {
        this.tokenExpirationDuration = setTimeout(() => this.logout(), expirationDuration);
    }

    logout() {
        this.newuser.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userInfo');
        if (this.tokenExpirationDuration){
            clearTimeout(this.tokenExpirationDuration);
        }
    }
    private errorHandler(errorResp: HttpErrorResponse) {
        let errorMessage = 'The unknown errror occured';
        if (!errorResp.error || !errorResp.error.error) {
            return throwError(() => errorMessage)
        } else {
            switch (errorResp.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email addres is already exist';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'Password sign-in is disabled for this project';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'The password is invalid or the user does not have a password';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'The user account has been disabled by an administrator';
                    break;
            }
            return throwError(() => errorMessage)
        }
    }
}

