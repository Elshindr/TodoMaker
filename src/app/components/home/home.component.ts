import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  curUser  !: User;
  _subUser !: Subscription;

  constructor(private _userService: UserService){
  }

  isLogged(){
    return this._userService.user$.value.logged;
  }
  
  ngOnInit(): void {
    this._subUser = this._userService.user$.subscribe(user =>{
      this.curUser = user;
    });
  }

  ngOnDestroy(): void {
    this._subUser.unsubscribe();
  }
}
