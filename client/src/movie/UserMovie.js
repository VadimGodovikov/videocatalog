import {makeAutoObservable} from "mobx" 

export default class UserMovie {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return localStorage.getItem('token');
    }
    get user(){
        return this._user
    }

}

