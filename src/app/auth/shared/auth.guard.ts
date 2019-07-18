import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private url: string;

    constructor(private auth: AuthService, private router: Router){}

    private handleAuthState(): boolean{
        if(this.isLoginOrRegister()){
            this.router.navigate(['/admin']);
            return false;
        }

        return true;
    }

    private handleNotAuthState(): boolean{
        if(this.isLoginOrRegister()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    private isAdmin(): boolean {
        if(this.url.includes('admin')){
            return true;
        }
        return false;
    }

    private isLoginOrRegister(): boolean{
        if(this.url.includes('login')){
            return true;
        }
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.url = state.url;
        if(this.auth.isAuthenticated()){
            return this.handleAuthState();
        }

        return this.handleNotAuthState();
    }

}