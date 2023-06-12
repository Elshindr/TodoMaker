import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currUserId !: number;
  _subUser !: Subscription;
  currUser !: User;
  constructor(private _userService: UserService, private _router: Router) {
  }

  onGoHome() {
    console.log("== onGoHome");

    if(this.currUser == undefined){

      console.log('curUser est undefined');

    } else{
      console.log('nest pas undefined');
    }


    if (this.currUser!= undefined && this.currUser.logged) {
      console.log("KLK1 est CO");
      console.log(this.currUser.name + "est connecté");
      this._userService.user$.subscribe(user => {
        this.currUserId = user.id;
      })

      this._router.navigateByUrl('home/' + this.currUser.id);
    } else { 
      console.log("PAS CO");
      this._router.navigateByUrl('home');
    }
  }


  onGoLstTodos() {

    console.log("== onGolstTodos");

    if (this.currUser!= undefined && this.currUser.logged) {
      console.log(this.currUser.name + 'est CO == GO LIST/id');
      this._userService.user$.subscribe(user => {
        this.currUserId = user.id;
      })

      this._router.navigateByUrl('liste/' + this.currUser.id);
    }else{
      console.log('PAS CO == go HOME ');
      this._router.navigateByUrl('home');
    }
  }

  ngOnInit(): void {
    console.log("== init HEADER")
    this._subUser = this._userService.user$.subscribe(user => {
      setTimeout(() => {this.currUser = user}, 1000)
    });

    if(this.currUser == undefined){
      this.currUser = new User("","");
    }
  }


  ngOnDestroy(): void {
    this._subUser.unsubscribe();
  }
}
