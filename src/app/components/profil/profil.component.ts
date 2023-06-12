import { User } from 'src/app/models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy{
  _subUser !: Subscription;
  _subTodos !: Subscription;
  curUser !: User;
  lstTodo !: Todo[];
  
  onEdit = false;
  editName = "";
  editPwd  = "";
  constructor(private _userService: UserService, private _todoService:TodoService, private _router: Router){
  }


  onRemove(){
    const result = confirm("Etes vous sur de vouloir supprimer votre compte?");

    if(result){

      this._todoService.lstTodos$.value.forEach(element => {
        console.log(element)
        this._todoService.removeOne(element);
        console.log(element.text + " est suppr");
      });

      this._userService.removeOne(this.curUser.id);
    }
  }

  onLogOut(){
    const result = confirm("Etes vous sûr de vouloir partir?");
    if(result){
      const user = new User("", "");
      user.logged = false;
      this._userService.user$.next(user);
      this._todoService.lstTodos$.next([]);
      this._router.navigateByUrl('home');
    }
  }

  onEditUser(name:string, pwd:string) {
    this.onEdit = !this.onEdit;
    console.log(this.curUser);
    if(!this.onEdit){
      console.log("onsave");
      this.curUser.name = name;
      this.curUser.pwd = pwd;
      console.log(this.curUser);
      this._userService.updateOne(this.curUser).subscribe({
        next: (user) => {
          this.curUser = user;
          console.log("ok update user");
        },
        error: () => {
          console.log("error update user");
        }
      });
      
    } else if (this.onEdit){
      console.log("onEdit");
      console.log(this.curUser);
      this.editName = this.curUser.name;
      this.editPwd = this.curUser.pwd;
    }
  }


  ngOnInit(): void {
    this._subUser = this._userService.user$.subscribe(
        user => {
        this.curUser = user;
      }
    );

    this._subTodos = this._todoService.lstTodos$.subscribe(
      todos => {
        this.lstTodo = todos;
      }
    );
  }

  ngOnDestroy(): void {
    this._subUser.unsubscribe();
    this._subTodos.unsubscribe();
  }

}