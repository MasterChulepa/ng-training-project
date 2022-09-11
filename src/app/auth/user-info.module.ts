export interface UserAccaunt {
    email: string,
    password: string
}
export interface AuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}
export class User{
    constructor(public email: string, public id: string, private _token: string, private _tokenExpiratiomDate: Date){}
    get token() {
        if (this._tokenExpiratiomDate < new Date() || !this._tokenExpiratiomDate){
            return null
        }
        return this._token;
    }
}