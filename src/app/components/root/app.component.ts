import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'MyTodos';
  private _subUser !: Subscription;
  private _subRoute !: Subscription;
  user !: User;

  constructor(private _UserService: UserService, private _route:ActivatedRoute){
  }

  ngOnInit(): void {
    this._subUser = this._UserService.user$.subscribe(user => {
      this.user = user;
    });

  }

  ngOnDestroy(): void {
    this._subRoute.unsubscribe();
    this._subUser.unsubscribe();
  }
}
