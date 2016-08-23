import {Injectable} from "@angular/core";
import {User} from "./../models/user";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthService {
    private activeUser: User;
    constructor() {}

    login(username: string, password: string): Observable<User> {
        return Observable.create((observer) => {
            this.activeUser = new User(username);
            observer.next(this.activeUser);
            observer.complete();
        });
    };

    getActiveUser(): User {
        return this.activeUser;
    }
}