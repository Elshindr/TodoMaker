import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionGuard implements CanActivate {
  private user!: User;
  private subUser !: Subscription;
  private subRoute !: Subscription;

  constructor(private router: Router, private _userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.subUser = this._userService.user$.subscribe(user => {
      this.user = user;
    })

    const idUserPath = route.params['idUser'];
    const { routeConfig } = route;
    const { path } = routeConfig as Route;

    if (path?.includes('admin') && this.user.name === 'admin') {
      this.subUser.unsubscribe();
      return true;
    }

    if (path?.includes('home/:idUser') && this.user.id == idUserPath && this.user.name != '' && this.user.logged) {
      this.subUser.unsubscribe();
      return true;
    }

    if (path?.includes('liste/:idUser') && this.user.id == idUserPath && this.user.name != '' && this.user.logged) {
      this.subUser.unsubscribe();
      return true;
    }


    console.log("-------------------------ACCES REFUSE");
    this.subUser.unsubscribe();
    this.router.navigateByUrl('home');
    return false;

  }

}
