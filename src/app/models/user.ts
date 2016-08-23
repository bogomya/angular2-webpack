export class User {
    constructor(private username: string, private roles: string[] = []) {
    }

    isAdmin(): boolean {
        return this.roles.indexOf("admin") !== -1;
    }
}